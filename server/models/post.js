const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  upvoters: [
    {
      user_id: {
        type: String,
        required: true,
      },
    },
  ],
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
    required: false,
  },
});

module.exports = mongoose.model("Post", postSchema);
