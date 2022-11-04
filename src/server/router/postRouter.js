import express from "express";
const router = express.Router();

router.get('/get/:id', (req, res) => {
  res.send(`GET /post/get/${req.params.id}`);
})

export default router;
