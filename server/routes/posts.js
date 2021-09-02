const { response } = require("express");
const express = require("express");
const post = require("../models/post");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");

let getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ message: `Cannot find post with id: ${req.params.id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
};

//Getting all Posts
router.get("/", async (req, res) => {
  try {
    const Posts = await Post.find();
    res.send(Posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting comments on each post
router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.find({
      parent_post_id: req.params.id,
    });
    res.send(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Additng an Post
router.post("/", async (req, res) => {
  const post = new Post({
    text: req.body.text,
    url: req.body.url,
    date: Date.now(),
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updateting an Post
router.patch("/:id", async (req, res) => {
  if (req.body.text) {
    res.post.text = req.body.text;
  }
  if (req.body.url) {
    res.post.url = req.body.url;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting an Post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "post deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
