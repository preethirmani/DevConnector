const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({
  msg: 'Post Route works!'
}));

module.exports = router;