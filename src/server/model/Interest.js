import mongoose from "mongoose";
const {Schema} = mongoose;

const interestSchema = new Schema({
  name: String,
})

const Interest = mongoose.model('Interest', interestSchema);

export default Interest;
