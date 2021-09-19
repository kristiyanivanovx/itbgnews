const getters = require('../functions/getters');
const Post = require('../models/post');
const User = require('../models/user');

async function getPost(req, res) {
  const { skip, limit } = req.query;

  try {
    const posts = await Post.find()
      .sort({ upvoters: -1, creationDate: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const count = await Post.find().count();

    res.json({
      posts: posts,
      postsCount: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getComments(req, res) {
  try {
    let comments = await getters.commentsGetter(req);
    res.status(200).json({ post: req.post, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function postPost(req, res) {
  const { text, url, authorId } = req.body;
  const user = await User.findById({ _id: authorId });

  const newPost = new Post({
    text,
    url,
    authorId,
    authorName: user.username,
    lastEditDate: Date.now(),
    creationDate: Date.now(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function patchPost(req, res) {
  // todo make validation on url if exists
  const { text, url } = req.body;
  let hasChanged = false;

  if (text) {
    req.post.text = text;
    hasChanged = true;
  }

  if (url) {
    req.post.url = url;
    hasChanged = true;
  }

  if (hasChanged) {
    req.post.lastEditDate = Date.now();
  }

  try {
    if (!hasChanged) {
      res.status(400).json({ message: 'Nothing was changed.' });
      return;
    }

    const updated = await req.post.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function vote(req, res) {
  const post = req.post;
  const user = req.user;

  //check if upvote exists
  let upvoteExists = !!(await Post.findOne({
    _id: post._id,
    upvoters: { $elemMatch: { userId: user._id } },
  }));

  try {
    if (upvoteExists) {
      //remove the upvote
      await Post.updateOne(post, {
        $pull: { upvoters: { userId: user._id } },
      });
      await post.save();

      res.status(200).json({
        count: post.upvoters.length - 1,
        // count: post.upvoters.length,
        message: `removed ${user.username}`,
      });
    } else {
      //Add the upvote
      post.upvoters.push({ userId: user._id });
      await post.save();
      // post.save();

      res.status(201).json({
        // count: post.upvoters.length + 1,
        count: post.upvoters.length,
        message: `added ${user.username}`,
      });
    }
  } catch (err) {
    res.status(304).json({ message: err.message });
  }
}

async function deletePost(req, res) {
  const post = req.post;
  const user = req.user;

  if (String(post.authorId) === String(user._id)) {
    try {
      await post.delete();
      user.postsCount -= 1;
      await user.save();

      res.status(200).json({ message: 'post deleted!' });
      return;
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  }

  res.status(401).json({ message: 'The user does not own the post!' });
}

module.exports = {
  getPost,
  getComments,
  postPost,
  patchPost,
  vote,
  deletePost,
};
