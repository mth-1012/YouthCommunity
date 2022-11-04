const express = require('express');
const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
