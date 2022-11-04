const express = require('express');
const router = express.Router();

router.get('/get/:id', (req, res) => {
  res.send(`GET /user/get/${req.params.id}`);
})

module.exports = router;
