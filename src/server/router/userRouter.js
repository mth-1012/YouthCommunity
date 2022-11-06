import express from "express";
const router = express.Router();

import User from "../model/User.js";

router.get("/get/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({
    email: email,
  });
  res.status(200).json({ user: user });
});

router.get("/get/:email/checkPassword/:password", async (req, res) => {
  const { email, password } = req.params;
  const user = await User.findOne({
    email: email,
  });
  res.status(200).json({
    match: !!user && user.password === password,
    userInfo: user,
  });
});

router.post("/createUser", async (req, res) => {
  try {
    const { user } = req.body;
    const newUser = await User.create({
      email: user.email,
      username: user.username,
      password: user.password,
      location: user.location,
      interest: user.interest,
    });
    res.status(200).json({ success: !!newUser, user: newUser });
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
});

export default router;
