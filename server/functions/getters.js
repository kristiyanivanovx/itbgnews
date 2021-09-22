const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

async function postGetter(req, res, next) {
  const postId = req.params.postId;
  let post;

  try {
    post = await Post.findById(postId).exec();

    if (!post) {
      return await res.status(404).json({
        message: `Cannot find post with id: ${postId}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.post = post;
  next();
}

async function userGetter(req, res, next) {
  const userId = req.user?.sub || req.params.userId;
  let user;

  try {
    user = await User.findById(userId).exec();

    if (!user) {
      res.status(404).json({
        message: `Cannot find user with id: ${userId}`,
      });

      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }

  req.userObject = user;
  next();
}

async function commentGetter(req, res, next) {
  let comment;

  try {
    comment = await Comment.findById(req.params.commentId).exec();

    if (!comment) {
      res.status(404).json({
        message: `Cannot find comment with id: ${req.params.commentId}`,
      });

      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }

  req.comment = comment;
  next();
}

async function commentsGetter(postId) {
  return Comment.find({
    parentPostId: postId,
  }).exec();
}

async function getSearch(req, res) {
  const { searchTerm } = req.query;

  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');

      const posts = await Post.find({
        text: { $regex: regex },
      }).exec();

      res.json({
        posts: posts,
      });
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  commentsGetter,
  commentGetter,
  postGetter,
  userGetter,
  getSearch,
};
