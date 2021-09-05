const express = require("express");
const router = express.Router();
const Comment = require("../Models/comment");

//gets a comment with specific id
let getComment = async (req, res, next) => {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (!comment)
      return res
        .status(404)
        .json({ message: `Cannot find comment with id: ${req.params.id}` });
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
    text: req.body.text,
    date: Date.now(),
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updateting a comment and adding upvote
router.patch("/:id", async (req, res) => {
  if (req.body.text) {
    res.post.text = req.body.text;
  }
  //IDK HOW THE UPVOTE SYSTEM SHOULD WORK
  //FOR NOW IF ACTIVATES IF THERE IS ANY VAULE != NULL IN req.body.upvote
  if (req.body.upvote) {
    res.post.upvote += 1;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Delete a comment
router.delete("/:id", getComment, async (req, res) => {
  try {
    await res.comment.remove();
    res.json({ message: "comment deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
