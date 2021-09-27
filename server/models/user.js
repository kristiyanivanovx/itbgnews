const mongoose = require('../config/mongooseConfig');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  date: Date,
  postsCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  upvotesCount: { type: Number, default: 0 },
  profileImage: String,
});

userSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  },
);
userSchema.index(
  {
    username: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model('User', userSchema);
