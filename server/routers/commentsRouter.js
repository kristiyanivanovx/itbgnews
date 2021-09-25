const express = require('express');
const router = express.Router();
const getter = require('../functions/getters');
const controller = require('../controllers/commentsController');
const auth = require('../middlewares/authMiddleware');

//Create a comment ✔
router.post(
  '/create',
  auth.verifyToken,
  getter.userGetter,
  controller.postComment,
);

//Adding/removing an upvote ✔
router.patch(
  '/upvote/:commentId',
  auth.verifyToken,
  getter.commentGetter,
  getter.userGetter,
  controller.upvoteComment,
);

//Updating a comment ✔
router.patch(
  '/update/:commentId',
  auth.verifyToken,
  getter.commentGetter,
  controller.patchComment,
);

//'Deletes' a comment (does not remove it from the database) ✔
router.delete(
  '/delete/:postId/:commentId',
  auth.verifyToken,
  getter.commentGetter,
  getter.postGetter,
  controller.deleteComment,
);

module.exports = router;
