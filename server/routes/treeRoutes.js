const router = require('express').Router();
const redisClient = require('../config/redisConfig');
const comments = require('../models/comment');
const { makeTree } = require('../utilities/makeTree');
const {cache} = require("../middlewares/cache")

router.get('/:parentPostId', async (req, res) => {
  const allData = await comments
    .find({ parentPostId: req.params.parentPostId })
    .lean();

  const treeData = makeTree(allData);

  // redisClient.set('tree', JSON.stringify(allData));

  res.json({
    tree: treeData,
  });

  return;
});

// this is for caching tree


module.exports = router;
