const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");


//Create a comment
router.post("/", async (req, res) => {
  const comment = new Comment({
    parent_article_id: req.body.parent_article_id,
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

module.exports = router;
