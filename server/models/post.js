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
    default: 0
  },
  //if textContent is true then the file is available.
  //False => it has been deleted
  textContent: {
    type: Boolean,
    required: true,
    default: true,
  },
  last_edit_date: {
    type: Date,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
