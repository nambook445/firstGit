const express = require('express')
const router = express.Router();
const db = require('../model/db.js')

router.get('/', (req, res)=>{
  
  const sql = `SELECT topic.id, topic.title, topic.description, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, users.nickname FROM topic LEFT JOIN users ON topic.user_id = users.id ORDER BY topic.id DESC `;
  db.query(sql, (err, results)=>{
    const data = results;
    res.send({test:data})
  });
});

router.post('/', (req, res)=>{
  const sql = `INSERT INTO topic (title, description, created, user_id) VALUES(?, ?, NOW(), ?)`
  db.query(sql, [req.body.title, req.body.description, req.body.user_id], (err, results)=>{
    res.send('ok');
  });
})

router.put('/', (req, res)=>{
  const sql = `UPDATE topic SET title=?, description=? WHERE id=?`;
  db.query(sql, [req.body.title, req.body.description, req.body.id], (err, results) =>{

    res.send('ok')
  })
});

router.delete('/', (req, res)=>{
  const sql = `DELETE FROM topic WHERE id = ?`
  db.query(sql, [req.body.id], (err, results)=>{
    if(err){
      throw err;}
    res.send('ok')
  })
}
)


module.exports = router;
