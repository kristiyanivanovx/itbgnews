const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  authorName: {
    type: String,
  },
  url: {
    type: String,
  },
  upvoters: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  lastEditDate: {
    type: Date,
  },
  creationDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Post', postSchema);
