import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  tags: [String],
  location: String,
  challenge: {
    type: Boolean,
    required: true,
    default: true
  },
  starUN: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const Post = mongoose.model('Post', postSchema);

export default Post;
