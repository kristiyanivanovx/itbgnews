require("dotenv").config()
const cloudinary = require(`cloudinary`).v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
}).then(() => console.log("Successfully connected to Cloudinary"));

module.exports = cloudinary