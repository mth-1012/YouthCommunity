import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
const uri = "mongodb+srv://<YOUR MONGODB ATLAS LINK>";

const app = express();

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
