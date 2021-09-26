const express = require('express');
const router = express.Router();
const getters = require('../functions/getters');
const controllers = require('../controllers/postsController');
const auth = require('../middlewares/authMiddleware');
const { cloudinary } = require('../config/cloudinaryConfig');
const {verifyToken} = require("../middlewares/authMiddleware")

//Getting all Posts by page ✔
router.get('/', controllers.getPost);

//Getting all Posts by specific user ✔
router.get('/by/:userId', getters.userGetter, controllers.getPosts);

//Getting results by a search query
router.get('/search', getters.getSearch);

//Getting comments and post by post id ✔
router.get('/comments/:postId', getters.postGetter, controllers.getComments);


router.get('/my-profile/image', verifyToken,async (req , res) => {
  const userId = req.user.sub
  console.log(userId + "This is the id ")
  const { resources } = await cloudinary.search
    .expression(`profile_pictures/public_id:${userId}`)
    .execute();
  if(resources.length > 0){
    console.log(resources)
    return res.json({
      data : resources[0].secure_url
    })
  }
  return res.status(404).json({
    massage : "This image cannot be found"
  })

})
router.post('/my-profile/image', async (req , res) => {
  const {imageString , userId} = req.body
  console.log(imageString , userId)

  try {
    const uploadResponse = await cloudinary.uploader.upload(imageString, {
      public_id : userId,
      folder: "profile_pictures"
    });
    console.log(uploadResponse);
    res.json({ msg: 'Sucessfully uploaded image' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
})

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
