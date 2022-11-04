import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
  title: String,
  like: Number,
  description: String,
})

const Post = mongoose.model('Post', postSchema);

export default Post;
