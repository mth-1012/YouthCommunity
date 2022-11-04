import express from "express";
const router = express.Router();

import Post from "../model/Post.js";

router.get('/get/:id', (req, res) => {
  res.send(`GET /post/get/${req.params.id}`);
})

router.post('/createPost', async (req, res) => {
  try {
    const {post} = req.body;
    const newPost = await Post.create({
      email: post.email,
      username: post.username,
      title: post.title,
      description: post.description,
      interest: post.interest,
      challenge: post.challenge,
      location: post.location || undefined,
      tags: post.tags || undefined,
      createdAt: Date.now()
    })
    res.status(200).json({
      success: !!newPost,
      post: newPost
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
})

export default router;
