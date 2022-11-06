import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
const uri =
  "mongodb+srv://youthy:QXiqpMoHiYt6WpqQ@cluster0.qwte0k0.mongodb.net/?retryWrites=true&w=majority";

const app = express();
// const cors = require("cors");

app.use(cors()); // Use this after the variable declaration
app.use(express.json());

app.use("/user", userRouter);
app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.send({ message: "Application is up and running!" });
});
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

mongoose.connect(uri).then();
