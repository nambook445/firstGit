const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
  res.send({test:"welcome axios"})
});

module.exports = router;
