const express = require('express');
const router = express.Router();

router.get('/register', (req,res) => 
  res.json({
    msg: 'User Route Works!'
  }));

  module.exports = router;
