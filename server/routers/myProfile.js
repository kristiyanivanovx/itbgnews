const router = require('express').Router();
const multer = require('multer');
const allowedExtensions = ["gif" ,  "jpg" , "png" , "jpeg"]
const upload = multer({
  dest: 'uploads/' ,
  fileFilter : function (req, file, cb) {
    let currentExtension = file.originalname.split(".")[1]
    if (!allowedExtensions.includes(currentExtension)) {
      req.errorMessage = `${currentExtension} is not allowed extension`
      return cb(null , false)
    }
    cb(null, true);
  }
});
const { verifyToken } = require('../middlewares/authMiddleware');
const { cloudinary } = require(`../config/cloudinaryConfig`);
const fs = require('fs');
const { promisify } = require('util');
const { log } = require('nodemon/lib/utils');
const unlinkAsync = promisify(fs.unlink);

router.get('/image/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const { resources } = await cloudinary.search
      .expression(`tbg-news/profile-pictures/ filename=${userId}`)
      .execute();

    if (resources.length > 0) {
      return res.status(200).json({
        img: resources[0].secure_url,
      });
    }
    return res.status(404).json({
      massage: 'This image cannot be found',
    });
  } catch (er) {
    console.log(er);
  }
});

router.post('/image', verifyToken, upload.single('image'), async (req, res) => {
  const userId = req.user.sub;
  const file = req.file;
  if (req.errorMessage){
    return res.status(405).json({
      message : req.errorMessage
    })
  }
  const uploadResponse = await cloudinary.uploader
    .upload(file.path, {
      public_id: userId,
      folder: 'itbg-news/profile-image',
    })
    .catch((err) => console.log(err))
    .then((data) => {
      res.json({
        msg: 'Successfully uploaded image',
        img: data.secure_url,
      });
    })
    .then(async () => await unlinkAsync(req.file.path));
});

module.exports = router;
