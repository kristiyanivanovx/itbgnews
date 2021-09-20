const express = require('express');
const router = express.Router();
const getters = require('../functions/getters');
const controllers = require('../controllers/postControllers');
const auth = require('../middlewares/authMiddleware');

//Getting all Posts by page ✔
router.get('/', controllers.getPost);

router.get('/search', getters.getSearch);

//Getting comments and post by post id ✔
router.get('/comments/:postId', getters.postGetter, controllers.getComments);

//Creating a Post ✔
router.post('/create', auth.verifyToken, controllers.postPost);

//Updating a Post ✔
router.patch(
  '/update/:postId/:userId',
  auth.verifyToken,
  getters.postGetter,
  getters.userGetter,
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

//'Deletes' a Post (does not remove it from the database) ✔
router.delete(
  '/:userId/:postId',
  auth.verifyToken,
  getters.postGetter,
  getters.userGetter,
  controllers.deletePost,
);

module.exports = router;
