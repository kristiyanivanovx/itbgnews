const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  parent_post_id: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  author_id: {
    type: String,
    //type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parent_comment_id: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  //Create systrem for upvotes
  upvoters: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
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
    required: false,
  },
  creation_date: {
    type: Date,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
