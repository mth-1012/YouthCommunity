import express from "express";
const router = express.Router();

import User from "../model/User.js";

router.get('/get/:username', async (req, res) => {
  const {username} = req.params;
  const user = await User.findOne({
    username: username
  });
  res.status(200).json({user: user});
})

router.get('/get/:username/checkPassword/:password', async (req, res) => {
  const {username, password} = req.params;
  const user = await User.findOne({
    username: username
  });
  res.status(200).json({
    match: user.password === password
  })
})

router.post('/createUser', async (req, res) => {
  try {
    const {user} = req.body;
    const newUser = await User.create({
      email: user.email,
      username: user.username,
      password: user.password,
      location: user.location,
      interest: user.interest
    });
    res.status(200).json({success: !!newUser, user: newUser});
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
})

export default router;
