const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const excercise = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Excercise", excercise);
