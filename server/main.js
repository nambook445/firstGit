const express = require('express');
const app = express();
const port = 8080;
const db = require('./model/db');
const axios = require('axios');
var template = require('./template/index.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require("express-session");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore({}, db);
var flash = require('connect-flash');
const bcrypt = require('bcrypt');
const { Axios } = require('axios');
const saltRounds = 10;

const cors = require('cors');
const test = require('./Router/test');

app.use(cors({
  origin: true,
  credentials: true
}));
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;
app.use(flash());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
	key: 'connect.mysql.sid',
	secret: 'fadasdfh#$^&jk252353',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.username);
});
passport.deserializeUser(function(id, done) {
  db.query(`SELECT * FROM users WHERE username=?`,[id], (err, results)=>{
    if(err){
      done(null, false)
    } else {
      done(null, id);
    }
    })
});

passport.use(new LocalStrategy(
  (username, password, done)=>{
    db.query(`SELECT * FROM users WHERE username =?`, [username], (err, results)=>{
      var user = results[0];
     if(!user){
       return done(null, false, { message: '아이디를 찾을 수 없습니다.' })
     } else if(!bcrypt.compareSync(password, user.password)) {       
          return done(null, false,{ message: '비밀번호가 틀렸습니다.' })        
     } else {
      return done(null, user)
     } 
    });
  }
));


app.use('/api', test);

app.get('/fetch', (req, res)=>res.render('fetch'))

app.get('/portfolio', (req, res)=>{
  res.render('portfolio_index')
})

app.get('/', (req, res)=>{
	res.render('index', {
		loginStat:template.LOGIN(req, res)
	})
})

app.get('/board/:pageId', (req, res)=>{
  if(isNaN(req.params.pageId)||req.params.pageId<=0){
    res.redirect('/board/1');
  } 
    db.query('SELECT * FROM topic',	(err, results)=>{
      var currentPage = parseInt(req.params.pageId);
      var limit = 10;
      var offset = (currentPage-1)*limit;
      var totalPosts = results.length
      var totalPage = Math.ceil(totalPosts/limit);
      var pageLimit = 5;
      var gap = currentPage%pageLimit===0 ? pageLimit-1 : currentPage%pageLimit-1;
      var startPage = currentPage-gap;
      var endPage = startPage+pageLimit-1;
      var sql = `SELECT topic.id, topic.title, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, users.nickname FROM topic LEFT JOIN users ON topic.user_id = users.id ORDER BY topic.id DESC LIMIT ? OFFSET ?`;
      db.query(sql, [limit, offset], (err, results)=>{
        res.render('board', {
          loginStat:template.LOGIN(req, res),
          results,
          startPage,
          endPage,
          totalPage
        });
      });
    });
});

app.get('/create', (req, res)=>{
	res.render('create',{
		user: req.user,
		loginStat:template.LOGIN(req, res)
	})
})

app.get('/page/:pageId', (req, res)=>{
	var sql = `SELECT topic.id, title, description, nickname, topic.user_id FROM topic LEFT JOIN users ON topic.user_id = users.id WHERE topic.id=?`;
	db.query(sql, [req.params.pageId], (err, results)=>{
		res.render('page',{
			loginStat:template.LOGIN(req, res),
			results
		})
	})
})

app.get('/update/:updateId', (req, res)=>{
	db.query(`SELECT * FROM topic WHERE id=?`, [req.params.updateId], (err, results)=>{
		res.render('update', {
			user: req.user,
      loginStat:template.LOGIN(req, res),
			results
		})
	})
})

app.get('/login', (req, res)=>{
	res.render('login', {
		loginStat:template.LOGIN(req, res)
	})
})

app.get('/logout', (req, res) =>{
  req.logout()
  req.session.destroy(() => {
    res.clearCookie('connect.mysql.sid');
});
  
})

app.get('/resist', (req, res)=>{
  res.render('resist',{
    user: req.user,
    loginStat:template.LOGIN(req, res)
  })
})

app.post('/create', (req, res)=>{
  var sql = `INSERT INTO topic (title, description, created, user_id) VALUES(?, ?, NOW(), ?)`
  db.query(sql, [req.body.title, req.body.description, req.body.user_id], (err, results)=>{
    res.redirect(`/board`);});
})


app.post('/update', (req, res,)=>{
  db.query(`UPDATE topic SET title=?, description=? WHERE id=?`, [req.body.title, req.body.description, req.body.id], (err, results)=>{
      if(err){
        throw err;}     
      res.redirect(`/board`);
  });
});

app.post('/delete', (req, res)=>{
    db.query(`DELETE FROM topic WHERE id = ?`, [req.body.id], (err, results)=>{
      if(err){
        throw err;}
      res.redirect('/board')
    })
  }
)

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err)
    if (!user) return res.status(404).json(info)
    req.logIn(user, function (err) {
      if (err) return next(err)
      return res.json({
        user: req.user
       })
    })
  })(req, res, next)
})

app.post('/resist', (req, res)=>{
  bcrypt.genSalt(saltRounds, (err, salt)=>{
    bcrypt.hash(req.body.password, salt, (err, hash)=>{
      var sql= `INSERT INTO users (username, password, nickname, created) VALUES (?, ?, ?, NOW())`; 
      db.query(sql,[req.body.username, hash, req.body.nickname], (err, results)=>{
        var sql= `SELECT * FROM users WHERE username=?`;
        db.query(sql, [req.body.username], (err, results)=>{
          if(err){
            res.sendStatus(500);
          } else {
            var user= results[0];
            req.login(user, (err)=>{
              req.session.save(()=>{res.redirect('/');})
            })          
          }
        })
      });     
    });
  })
});

app.use((req, res, next)=>{
  res.status(404).send('Sorry cant find that!');});

app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
})