const router = require('express').Router();
const multer = require("multer")
const upload = multer()
const {verifyToken} = require("../middlewares/authMiddleware")
const {cloudinary} = require(`../config/cloudinaryConfig`)
router.get('/image', verifyToken,async (req , res) => {
  const userId = req.user.sub
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
router.post('/image', upload.single("image"), async (req , res) => {
  const file = req.file
  const userId = 1
  console.log(file)
  try {
    const uploadResponse = await cloudinary.uploader.upload(file.originalname, {
      public_id : userId,
      folder: "profile_pictures"
    });
    res.json({ msg: 'Sucessfully uploaded image' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
})


module.exports = router