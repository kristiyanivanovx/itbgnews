const Comment = require('../models/comment');
const User = require('../models/user');

async function postComment(req, res) {
  const user = req.userObject;

  const { parentPostId, parentCommentId, text } = req.body;

  const newComment = new Comment({
    parentCommentId,
    authorId: user._id,
    parentPostId,
    text,
    authorName: user.username,
    creationDate: Date.now(),
    lastEditDate: Date.now(),
  });

  try {
    await newComment.save();

    user.commentsCount += 1;
    await user.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

async function upvoteComment(req, res) {
  const comment = req.comment;
  const user = req.userObject;

  //check if upvote exists
  const upvoteExists = !!(await Comment.findOne({
    _id: comment._id,
    upvoters: { $elemMatch: { userId: user._id } },
  }));

  try {
    if (upvoteExists) {
      //remove the upvote
      await Comment.updateOne(comment, {
        $pull: { upvoters: { userId: user._id } },
      });

      user.upvotesCount -= 1;
      user.save();

      res.status(200).json({
        count: comment.upvoters.length - 1,
        message: `removed ${user.username}`,
      });
    } else {
      //Add the upvote
      comment.upvoters.push({ userId: user._id });
      user.upvotesCount += 1;

      await comment.save();
      await user.save();

      res.status(201).json({
        count: comment.upvoters.length,
        message: `added ${user.username}`,
      });
    }
  } catch (err) {
    res.status(304).json({ message: err.message });
  }
}

async function patchComment(req, res) {
  const { text } = req.body;
  let hasChanged = false;

  if (text !== req.comment.text) {
    hasChanged = true;
    req.comment.text = text;
    req.comment.lastEditDate = Date.now();
  }

  try {
    if (!hasChanged) {
      res.status(200).json({
        message: 'Nothing was changed',
      });

      return;
    }

    const updated = await req.comment.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteComment(req, res) {
  const comment = req.comment;
  const userId = req.user.sub;
  const user = await User.findById(userId).exec();

  if (String(comment.authorId) === String(user._id)) {
    try {
      comment.text = '[deleted]';
      user.commentCount -= 1;

      for (let j = 0; j < comment.upvoters.length; j++) {
        console.log(comment.upvoters[j].userId);

        let upvoter = await User.findById(comments.upvoters[j].userId);
        upvoter.commitedLikes -= 1;

        upvoter.save();
      }

      await comment.save();
      await user.save();

      res.status(200).json({ message: 'comment deleted!' });
      return;
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  }

  res.status(401).json({ message: 'The user does not own the comment!' });
}

module.exports = {
  postComment,
  upvoteComment,
  patchComment,
  deleteComment,
};
