const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user_input: {type: String, required: true},
  feedback: {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Feedback", FeedbackSchema);