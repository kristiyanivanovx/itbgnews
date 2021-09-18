const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  parent_post_id: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  parent_comment_id: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  text: {
    type: String,
  },
  upvoters: [
    {
      user_id: {
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
  last_edit_date: {
    type: Date,
  },
  creation_date: {
    type: Date,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
