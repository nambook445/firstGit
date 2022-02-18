const express = require('express')
const router = express.Router();
const db = require('../model/db.js')

router.get('/', (req, res)=>{
  const limit = 10;
  const offset = 0;
  const sql = `SELECT topic.id, topic.title, topic.description, DATE_FORMAT(topic.created, '%Y-%m-%d') AS created, users.nickname FROM topic LEFT JOIN users ON topic.user_id = users.id ORDER BY topic.id DESC LIMIT ? OFFSET ?`;
  db.query(sql, [limit, offset], (err, results)=>{
    const data = results;
    console.log(data);
    res.send({test:data})
    
  });
});


module.exports = router;
