const router = require('express').Router();
const redisClient = require('../config/redisConfig');
const comments = require('../models/comment');
const { makeTree } = require('../utilities/makeTree');
const {cache} = require("../middlewares/cache")

router.get('/:postId', cache, async (req, res) => {
  const postId = req.params.postId
  const allData = await comments.find({}).lean();
  const treeData = makeTree(allData);
  const postTree = treeData.find(el => el._id === postId)
  redisClient.set("tree " + postId.toString(), postTree)

  res.json({
    tree: treeData,
  });
});

// this is for caching tree


module.exports = router;
