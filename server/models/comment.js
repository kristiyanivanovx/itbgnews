const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  parent_post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author_id: {
    type: String,
    //type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
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

module.exports = mongoose.model("Comment", commentSchema);
