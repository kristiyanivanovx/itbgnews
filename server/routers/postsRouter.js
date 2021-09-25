const express = require('express');
const router = express.Router();
const getters = require('../functions/getters');
const controllers = require('../controllers/postsController');
const auth = require('../middlewares/authMiddleware');

//Getting all Posts by page ✔
router.get('/', controllers.getPost);

//Getting all Posts by specific user ✔
router.get('/by/:userId', getters.userGetter, controllers.getPosts);

//Getting results by a search query
router.get('/search', getters.getSearch);

//Getting comments and post by post id ✔
router.get('/comments/:postId', getters.postGetter, controllers.getComments);

//Creating a Post ✔
router.post(
  '/create',
  auth.verifyToken,
  getters.userGetter,
  controllers.postPost,
);
// router.post('/create', getters.userGetter, controllers.postPost);

//Updating a Post ✔
router.patch(
  '/update/:postId/',
  auth.verifyToken,
  getters.userGetter,
  getters.postGetter,
  controllers.patchPost,
);

//Voting on a post ✔
router.patch(
  '/upvote/:postId',
  auth.verifyToken,
  getters.userGetter,
  getters.postGetter,
  controllers.vote,
);

//'Deletes' a Post ✔
router.delete(
  '/delete/:postId',
  auth.verifyToken,
  getters.userGetter,
  getters.postGetter,
  controllers.deletePost,
);

module.exports = router;
