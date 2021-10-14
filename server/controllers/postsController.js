const getters = require('../functions/getters');
const Post = require('../models/post');
const User = require('../models/user');
const { isEmpty } = require('../utilities/common');
const validator = require('validator');

async function getPosts(req, res) {
  const { skip, limit } = req.query;
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ authorId: userId })
      .sort({ upvoters: -1, creationDate: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const count = await Post.find({ authorId: userId }).count();

    res.json({
      posts: posts,
      postsCount: count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

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
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getComments(req, res) {
  const postId = req.params.postId;

  try {
    let comments = await getters.commentsGetter(postId);
    res.status(200).json({ post: req.post, comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function postPost(req, res) {
  const { text, url } = req.body;
  const user = req.userObject;

  let errors = {};

  if (text.length < 6 || text.length > 250) {
    errors.errorTitle = 'The title must be at least 6 letters and at most 250.';
  }

  if (!validator.isURL(url, { require_protocol: true })) {
    errors.errorUrl = 'The url must be a valid hyperlink.';
  }

  if (!isEmpty(errors)) {
    res.json(errors);
    return;
  }

  const newPost = new Post({
    text,
    url,
    authorId: user._id,
    authorName: user.username,
    lastEditDate: Date.now(),
    creationDate: Date.now(),
  });

  try {
    user.postsCount += 1;

    await newPost.save();
    await user.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function patchPost(req, res) {
  // todo make validation on url if is valid
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
  const userId = req.user.sub;
  const post = req.post;

  const user = await User.findOne({ _id: userId });

  //check if upvote exists
  let upvoteExists = !!(await Post.findOne({
    _id: post._id,
    // upvoters: { $elemMatch: { userId: user._id } },
    upvoters: { $elemMatch: { userId: userId } },
  }));

  try {
    if (upvoteExists) {
      //remove the upvote
      await Post.updateOne(post, {
        $pull: { upvoters: { userId: userId } },
      });

      user.upvotesCount -= 1;

      await post.save();
      await user.save();

      res.status(200).json({
        count: post.upvoters.length - 1,
        // count: post.upvoters.length,
        message: `Removed user with Id ${userId}`,
      });
    } else {
      //Add the upvote
      post.upvoters.push({ userId: userId });
      user.upvotesCount += 1;

      await post.save();
      await user.save();

      res.status(201).json({
        // count: post.upvoters.length + 1,
        count: post.upvoters.length,
        message: `Added user with Id ${userId}`,
      });
    }
  } catch (err) {
    res.status(304).json({ message: err.message });
  }
}

async function deletePost(req, res) {
  const post = req.post;
  const userId = req.user.sub;

  if (String(post.authorId) === String(userId)) {
    try {
      //get all comment and upvotes on comment connected to the post and delete them too
      let comments = await getters.commentsGetter(post._id);
      //const commentCountUserPairs = [];

      for (let i = 0; i < comments.length; i++) {
        let author = await User.findById(comments[i].authorId);
        author.commentsCount -= 1;
        await author.save();

        for (let j = 0; j < comments[i].upvoters.length; j++) {
          console.log(comments[i].upvoters[j].userId);

          let upvoter = await User.findById(comments[i].upvoters[j].userId);
          upvoter.commitedLikes -= 1;

          upvoter.save();
        }
        //Find each users commentCount on the post
        //if (commentCountUserPairs.includes(author._id)) author._id += 1;
        //else commentCountUserPairs.push({ [author._id]: 1 });

        await comments[i].delete();
      }

      for (let k = 0; k < post.upvoters.length; k++) {
        let author = await User.findById(post.upvoters[k].userId);
        author.commitedLikes -= 1;

        author.save();
      }

      await post.delete();

      const user = await User.findById(userId);

      user.postsCount -= 1;
      await user.save();

      res
        .status(200)
        .json({ message: 'Post and comment have been deleted successfully!' });

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
  getPosts,
  getComments,
  postPost,
  patchPost,
  vote,
  deletePost,
};
