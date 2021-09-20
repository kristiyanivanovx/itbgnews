const express = require('express');
const router = express.Router();
const getter = require('../functions/getters');
const controller = require('../controllers/comments');
const auth = require('../middlewares/authMiddleware');

//Create a comment ✔
router.post('/', auth.verifyToken, controller.postComment);

//Adding/removing an upvote ✔
router.patch(
  '/upvote',
  auth.verifyToken,
  getter.commentGetter,
  getter.userGetter,
  controller.upvoteComment,
);

//Updating a comment ✔
router.patch(
  '/',
  auth.verifyToken,
  getter.commentGetter,
  controller.patchComment,
);

//'Deletes' a comment (does not remove it from the database) ✔
router.delete(
  '/',
  auth.verifyToken,
  getter.commentGetter,
  getter.postGetter,
  controller.deleteComment,
);

module.exports = router;
