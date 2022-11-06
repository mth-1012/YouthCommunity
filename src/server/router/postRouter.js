import express from "express";
const router = express.Router();

import Post from "../model/Post.js";
import { ObjectId } from "mongodb";

router.post("/createPost", async (req, res) => {
  try {
    const { post } = req.body;
    console.log("Post APi CAlled ", req.body);
    const newPost = await Post.create({
      email: post.email,
      username: post.username,
      title: post.title,
      description: post.description,
      interest: post.interest,
      challenge: post.challenge,
      location: post.location || undefined,
      tags: post.tags || undefined,
      createdAt: Date.now(),
    });
    res.status(200).json({
      success: !!newPost,
      post: newPost,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
});

router.post("/:id/upvote", async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);

    const post = await Post.findOne({ _id: objectId });
    const newPost = await Post.updateOne(
      { _id: post._id },
      { upvote: post.upvote + 1 }
    );
    res.status(200).json({
      success: !!newPost.modifiedCount,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const objectId = new ObjectId(id);

    const post = await Post.findOne({ _id: objectId });
    res.status(200).json({ post: post });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
});

router.post("/getList/interest", async (req, res) => {
  try {
    const { interests, chronological } = req.body;
    let postList = [];
    for (const value of interests) {
      const list = await Post.find().where("interest", value);
      postList = postList.concat(list);
    }
    if (chronological) {
      postList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    } else {
      postList.sort((a, b) => {
        return b.upvote - a.upvote;
      });
    }
    res.status(200).json({ postList: postList });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
});

router.post("/getList/local", async (req, res) => {
  try {
    const { location, chronological } = req.body;
    let postList = [];
    const list = await Post.find().where("location", location);
    postList = postList.concat(list);

    if (chronological) {
      postList.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    } else {
      postList.sort((a, b) => {
        return b.upvote - a.upvote;
      });
    }
    res.status(200).json({ postList: postList });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
})

export default router;
