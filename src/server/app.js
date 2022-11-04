import express from "express";
import mongoose from "mongoose";

import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
const uri = "mongodb+srv://youthy:QXiqpMoHiYt6WpqQ@cluster0.qwte0k0.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
})

mongoose.connect(uri).then();
