const express = require('express');
const router = express.Router();
const getter = require('../functions/getters');
const controller = require('../controllers/comments');
const {cache, rebaseRedis} = require("../middlewares/cache")

//Create a comment ✔
router.post('/', controller.postComment, rebaseRedis, cache);

//Adding/removing an upvote ✔
router.patch(
  '/upvote',
  getter.commentGetter,
  getter.userGetter,
  controller.upvoteComment,
);

//Updating a comment ✔
router.patch('/', getter.commentGetter, controller.patchComment, rebaseRedis, cache);

//'Deletes' a comment (does not remove it from the database) ✔
router.delete(
  '/',
  getter.commentGetter,
  getter.postGetter,
  controller.deleteComment,
  rebaseRedis, cache
);

module.exports = router;
