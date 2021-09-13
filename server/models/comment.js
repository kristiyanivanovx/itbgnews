const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  parentPostId: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  parentCommentId: {
    type: String,
    ref: "Comment",
  },
  text: {
    type: String,
  },
  upvoters: [
    {
      userId: {
        type: Schema.Types.ObjectId,
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
  creationDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
