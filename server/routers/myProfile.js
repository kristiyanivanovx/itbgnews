const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { verifyToken } = require('../middlewares/authMiddleware');
const { cloudinary } = require(`../config/cloudinaryConfig`);
router.get('/image', verifyToken, async (req, res) => {
  const userId = req.user.sub;
  const { resources } = await cloudinary.search
    .expression(`profile_pictures/public_id:${userId}`)
    .execute();
  if (resources.length > 0) {
    console.log(resources);
    return res.json({
      data: resources[0].secure_url,
    });
  }
  return res.status(404).json({
    massage: 'This image cannot be found',
  });
});
router.post('/image', verifyToken, upload.single('image'), async (req, res) => {
  const userId = 1;
  console.log(req);
  const file = req.file;
  const uploadResponse = await cloudinary.uploader.upload(file.path, {
    public_id: userId,
    folder: 'profile_pictures',
  }).catch(err => console.log(err)).then(data => {
    res.json({
      msg: 'Successfully uploaded image',
      img: data.secure_url,
    });
  });
});


module.exports = router;
