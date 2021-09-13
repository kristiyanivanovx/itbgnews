const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { getPost, getUser, getComments } = require('../functions/getters');

//Getting all Posts by page ✔
router.get('/', async (req, res) => {
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
//Getting comments and post by post id ✔
router.get('/comments', getPost, async (req, res) => {
  try {
    let comments = await getComments(res);
    res.status(200).json({ post: res.post, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Creating a Post ✔
router.post('/', async (req, res) => {
  const post = new Post({
    text: req.body.text,
    url: req.body.url,
    author_id: req.body.user_id,
    last_edit_date: Date.now(),
    creation_date: Date.now(),
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updateting a Post ✔
router.patch('/', getPost, async (req, res) => {
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
    if (!hasChanged) res.status(400).json({ message: 'Nothing was changed.' });

    const updated = await res.post.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Voting on a post ✔
router.patch('/upvote', getPost, getUser, async (req, res) => {
  const post = res.post;
  const user = res.user;

  if (String(post.author_id) === String(user._id)) {
    res.status(405).json({ message: "You can't vote on your own post!" });
  }

  //check if upvote exists
  const upvoteExists = !!(await Post.findOne({
    post,
    upvoters: { $elemMatch: { user_id: res.user._id } },
  }));

  try {
    if (upvoteExists) {
      //remove the upvote
      await Post.updateOne(post, {
        $pull: { upvoters: { user_id: res.user._id } },
      });

      res.status(200).json({
        count: post.upvoters.length - 1,
        message: `removed ${user.username}`,
      });
    } else {
      //Add the upvote
      post.upvoters.push({ user_id: user._id });
      post.save();
      res.status(201).json({
        count: post.upvoters.length,
        message: `added ${user.username}`,
      });
    }
  } catch (err) {
    res.status(304).json({ message: err.message });
  }
});

//'Deletes' a Post (does not remove it from the database) ✔
router.delete('/', getPost, getUser, async (req, res) => {
  const post = res.post;
  const user = res.user;

  if (String(post.author_id) === String(user._id)) {
    try {
      res.post.textContent = false;
      await res.post.save();
      res.status(200).json({ message: 'post deleted!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    return;
  }
  res.status(401).json({ message: 'The user does not own the post!' });
});

module.exports = router;
