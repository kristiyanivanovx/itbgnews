const express = require("express");
const router = express.Router();
const Post = require("../Models/post");
const Comment = require("../Models/comment");

//Gets post with specific Id
let getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.body.post_id);
    if (!post || !post.textContent)
      return res
        .status(404)
        .json({ message: `Cannot find post with id: ${req.body.post_id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
};

//Getting all Posts by page
router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const Posts = await Post.find({ textContent: true });
    const posts_page = Posts.slice(startIndex, endIndex);
    res.json(posts_page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting comments and post by post id
router.get("/comments", getPost, async (req, res) => {
  try {
    let comments = await Comment.find({
      parent_post_id: res.post._id,
      textContent: true,
    });
    res.json({ post: res.post, comments });
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
router.patch("/", getPost, async (req, res) => {
  let hasChanged = false;
  if (req.body.text) {
    res.post.text = req.body.text;
    hasChanged = true;
  }
  if (req.body.url) {
    res.post.url = req.body.url;
    hasChanged = true;
  }
  if (hasChanged) res.post.last_edit_date = Date.now();
  try {
    if (!hasChanged) res.status(304).json({ message: "Nothing was changed." });
    const updated = await res.post.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Voting on a post
router.patch("/upvote", async (req, res) => {
  //I get user_id from frontend and if it does not match any upvoters I add the user
  //to the upvoters else I find the user and remove him from the upvoters
  //returns the total number of upvotes (upvoters.lenght)
  //and mayble the user_ids' of all upvoters instead
  //const post_id = req.body.post_id;
  //const upvoter_id = req.body.user_id;

  const post = await Post.findById(post_id);
  //const user = await post.findById(user_id)
  res.json(post);
});

//'Deletes' a Post (does not remove it from the database)
router.delete("/", getPost, async (req, res) => {
  try {
    res.post.textContent = false;
    await res.post.save();
    res.status(200).json({ message: "post deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
