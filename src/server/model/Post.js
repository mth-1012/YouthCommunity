const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
  title: String,
  like: Number,
  description: String,
})

module.exports = postSchema;
