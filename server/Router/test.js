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


module.exports = router;
