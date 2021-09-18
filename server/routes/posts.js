const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const ConvertToTree = require('../functions/commentTree');
const {
  getPost,
  getUser,
  getComments,
  getComment_owner_relations,
} = require('../functions/getters');

//Getting all Posts by page ✔
router.get('/', async (req, res) => {
  const { skip, limit } = req.query;

  try {
    const posts = await Post.find({ textContent: true })
      .sort({ upvoters: -1, creation_date: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const count = await Post.find({ textContent: true }).count();

    res.json({
      posts: posts,
      postsCount: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting all Posts by searchQuery ✔
router.get('/search', async (req, res) => {
  const { searchTerm } = req.query;

  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');

      const posts = await Post.find({
        textContent: true,
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
});

//Getting comments and post by post id ✔
router.get('/:post_id/comments', getPost, async (req, res) => {
  try {
    let comments = await getComments(res);

    let commentTree = ConvertToTree(comments);
    commentTree = await getComment_owner_relations(commentTree);

    res.status(200).json({ post: res.post, commentTree });
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

//Updating a Post ✔
router.patch('/:post_id', getPost, async (req, res) => {
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
router.patch('/upvote/:post_id', getPost, getUser, async (req, res) => {
  const post = res.post;
  const user = res.user;

  //check if upvote exists
  const upvoteExists = !!(await Post.findOne({
    _id: post._id,
    upvoters: { $elemMatch: { user_id: user._id } },
  }));

  console.log('upvote exists?');
  console.log(upvoteExists);

  try {
    if (upvoteExists) {
      //remove the upvote
      await Post.updateOne(post, {
        $pull: { upvoters: { user_id: res.user._id } },
      });

      // post.update({
      //   $pull: { upvoters: { user_id: res.user._id } },
      // });
      // await post.save();

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
router.delete('/:user_id/:post_id', getPost, getUser, async (req, res) => {
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
