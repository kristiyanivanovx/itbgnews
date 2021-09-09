const express = require("express");
const router = express.Router();
const Comment = require("../Models/comment");

//gets a comment with specific id
let getComment = async (req, res, next) => {
  let comment;
  try {
    comment = await Comment.findById(req.body.comment_id);
    if (!comment || !comment.textContent)
      return res.status(404).json({
        message: `Cannot find comment with id: ${req.body.comment_id}`,
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.comment = comment;
  next();
};
//Create a comment
router.post("/", async (req, res) => {
  const comment = new Comment({
    parent_post_id: req.body.parent_post_id,
    author_id: req.body.author_id,
    parent_comment_id: req.body.parent_comment_id,
    text: req.body.text,
    creation_date: Date.now(),
    last_edit_date: Date.now(),
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updateting a comment and adding upvote
router.patch("/", getComment, async (req, res) => {
  let hasChanged = false;
  if (req.body.text) {
    res.comment.text = req.body.text;
    hasChanged = true;
  }
  if (hasChanged) res.comment.last_edit_date = Date.now();

  try {
    if (!hasChanged) res.status(304).json({ message: "Nothing was changed." });
    const updated = await res.comment.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//'Deletes' a comment (does not remove it from the database)
router.delete("/", getComment, async (req, res) => {
  try {
    res.comment.textContent = false;
    await res.comment.save();
    res.status(200).json({ message: "comment deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
