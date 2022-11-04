const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  location: String,
  interest: [String]
})

module.exports = userSchema;
