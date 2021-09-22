const express = require('express');
const router = express.Router();
const getter = require('../functions/getters');
const controller = require('../controllers/comments');
<<<<<<< HEAD
const {cache, rebaseRedis} = require("../middlewares/cache")

//Create a comment ✔
router.post('/', controller.postComment, rebaseRedis, cache);
=======
const auth = require('../middlewares/authMiddleware');

//Create a comment ✔
router.post('/', auth.verifyToken, controller.postComment);
>>>>>>> origin/chris

//Adding/removing an upvote ✔
router.patch(
  '/upvote',
  auth.verifyToken,
  getter.commentGetter,
  getter.userGetter,
  controller.upvoteComment,
);

//Updating a comment ✔
<<<<<<< HEAD
router.patch('/', getter.commentGetter, controller.patchComment, rebaseRedis, cache);
=======
router.patch(
  '/',
  auth.verifyToken,
  getter.commentGetter,
  controller.patchComment,
);
>>>>>>> origin/chris

//'Deletes' a comment (does not remove it from the database) ✔
router.delete(
  '/',
  auth.verifyToken,
  getter.commentGetter,
  getter.postGetter,
  controller.deleteComment,
  rebaseRedis, cache
);

module.exports = router;
