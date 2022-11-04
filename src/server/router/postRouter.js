const express = require('express');
const router = express.Router();

router.get('/get/:id', (req, res) => {
  res.send(`GET /post/get/${req.params.id}`);
})

module.exports = router;
