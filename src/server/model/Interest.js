import mongoose from "mongoose";
const {Schema} = mongoose;

const interestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
})

const Interest = mongoose.model('Interest', interestSchema);

export default Interest;
