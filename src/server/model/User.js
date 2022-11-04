import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  interest: [String]
})
const User = mongoose.model('User', userSchema);

export default User;
