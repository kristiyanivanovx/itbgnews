const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
  },
  upvoters: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  //if textContent is true then the file is available.
  //False => it has been deleted
  textContent: {
    type: Boolean,
    default: true,
  },
  lastEditDate: {
    type: Date,
  },
  creationgDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Post", postSchema);
