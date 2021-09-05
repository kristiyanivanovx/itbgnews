const express = require("express");
const router = express.Router();
const Post = require("../Models/post");
const Comment = require("../Models/comment");

//Gets post with specific Id
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

//Getting Posts by page
router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const Posts = await Post.find();
    const posts_page = Posts.slice(startIndex, endIndex);
    res.send(posts_page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting comments on each post (by page)
router.get("/:id", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const comments = await Comment.find({
      parent_post_id: req.params.id,
    });
    const commets_page = comments.slice(startIndex, endIndex);
    res.send(commets_page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Additng a Post
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
//Updateting a Post
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
//Deleting a Post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "post deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
