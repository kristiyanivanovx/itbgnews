const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

async function postGetter(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.body.postId);
    if (!post) {
      return await res.status(404).json({
        message: `Cannot find post with id: ${req.body.postId}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.post = post;
  next();
}

async function userGetter(req, res, next) {
  let user;
  try {
    user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({
        message: `Cannot find user with id: ${req.body.postId}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.user = user;
  next();
}

async function commentGetter(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.body.commentId);
    if (!comment) {
      return res.status(404).json({
        message: `Cannot find comment with id: ${req.body.commentId}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.comment = comment;
  next();
}

async function commentsGetter(req) {
  const comment = await Comment.find({
    parentPostId: req.postId,
    textContent: true,
  });
  return comment;
}

module.exports = {
  commentsGetter,
  commentGetter,
  postGetter,
  userGetter,
};
