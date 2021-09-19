const express = require('express');
const router = express.Router();
const getters = require('../functions/getters');
const auth = require("../middlewares/authMiddleware")
const controllers = require('../controllers/postControllers');

//Getting all Posts by page ✔
router.get('/', auth.verifyToken, controllers.getPost);

router.get('/search', getters.getSearch);

//Getting comments and post by post id ✔
router.get('/comments/:postId', getters.postGetter, controllers.getComments);

//Creating a Post ✔
router.post('/create', controllers.postPost);

//Updating a Post ✔
router.patch(
    '/update/:postId/:userId',
    getters.postGetter,
    getters.userGetter,
    controllers.patchPost,
);

//Voting on a post ✔
router.patch(
    '/upvote',
    getters.userGetter,
    getters.postGetter,
    controllers.vote,
);

//'Deletes' a Post (does not remove it from the database) ✔
router.delete(
    '/:userId/:postId',
    getters.postGetter,
    getters.userGetter,
    controllers.deletePost,
);

module.exports = router;
