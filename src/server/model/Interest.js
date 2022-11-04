const mongoose = require('mongoose');
const {Schema} = mongoose;

const interestSchema = new Schema({
  name: String,
})

module.exports = interestSchema;
