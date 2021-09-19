const Comment = require('../models/comment');

async function postComment(req, res) {
  console.log(req.body);
  const { parentPostId, authorId, parentCommentId, text } = req.body;
  const newComment = new Comment({
    parentCommentId,
    authorId,
    parentPostId,
    text,
    creationDate: Date.now(),
    lastEditDate: Date.now(),
  });

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

async function upvoteComment(req, res) {
  const comment = req.comment;
  const user = req.user;

  if (String(comment.authorId) === String(user._id)) {
    res.status(405).json({
      message: "You can't vote on your own comment!",
    });
  }
  //check if upvote exists
  const upvoteExists = !!(await Comment.findOne({
    comment,
    upvoters: { $elemMatch: { userId: req.user._id } },
  }));

  try {
    if (upvoteExists) {
      //remove the upvote
      await Comment.updateOne(comment, {
        $pull: { upvoters: { userId: req.user._id } },
      });

      res.status(200).json({
        count: comment.upvoters.length - 1,
        message: `removed ${user.username}`,
      });
    } else {
      //Add the upvote
      comment.upvoters.push({ userId: user._id });
      await comment.save();
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
      console.log(1);
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
  const user = req.user;

  if (String(comment.authorId) === String(user._id)) {
    try {
      comment.text = 'Deleted';
      await comment.save();
      res.status(200).json({ message: 'comment deleted!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    return;
  }
  res.status(401).json({ message: 'The user does not own the comment!' });
}

module.exports = {
  postComment,
  upvoteComment,
  patchComment,
  deleteComment,
};
