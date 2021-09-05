const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("post", postSchema);
