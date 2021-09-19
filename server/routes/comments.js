const express = require('express');
const router = express.Router();
const getter = require('../functions/getters');
const controller = require('../controllers/comments');

//Create a comment ✔
router.post('/', getter.userGetter, controller.postComment);

//Adding/removing an upvote ✔
router.patch(
  '/upvote',
  getter.commentGetter,
  getter.userGetter,
  controller.upvoteComment,
);

//Updating a comment ✔
router.patch('/', getter.commentGetter, controller.patchComment);

//'Deletes' a comment (does not remove it from the database) ✔
router.delete(
  '/',
  getter.commentGetter,
  getter.postGetter,
  controller.deleteComment,
);

module.exports = router;
