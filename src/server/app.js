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


if( process.env.NODE_ENV==='production'){
app.use(express.static('./digital-moment/build'));
app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));

}


const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port 5000");
});

mongoose.connect(uri).then();
