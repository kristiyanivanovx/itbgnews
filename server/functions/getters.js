const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

async function postGetter(req, res, next) {
  const postId = req.params.postId ?? req.body.postId;
  let post;

  try {
    post = await Post.findById(postId);

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
  const userId = req.params.userId ?? req.body.userId;
  let user;

  try {
    user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `Cannot find user with id: ${userId}`,
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
  return Comment.find({
    parentPostId: req.params.postId,
  });
}

async function getSearch(req, res) {
  const { searchTerm } = req.query;

  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');

      const posts = await Post.find({
        text: { $regex: regex },
      });

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
