const User = require('../models/user-schema');
const jwt = require('jsonwebtoken');
const redis_client = require('../config/redis-connect');
const bcrypt = require('bcrypt');
const { makeRefresh } = require('../utilities/generatingTokens');

async function Register(req, res) {
   const { username, password, email } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = new User({
      username,
      email,
      password: hashedPassword
   });

   try {
      const saved_user = await user.save();
      const [access_token, refresh_token] = makeRefresh(saved_user._id);
      res.json({
         status: true,
         message: 'Registered successfully.',
         data: { access_token, refresh_token }
      });
   } catch (error) {
      res.status(400).json({
         status: false,
         message: 'Something went wrong.',
         data: error
      });
   }
}

async function Login(req, res) {
   const { password, email } = req.body;

   try {
      const user = await User.findOne({
         email
      }).exec();

      if (user === null)
         res.status(401).json({
            status: false,
            errorEmail: 'There is not such email in the database'
         });
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
         res.status(401).json({
            errorPassword: 'Incorrect password'
         });
      }
      const [access_token, refresh_token] = makeRefresh(user.id);
      return res.json({
         status: true,
         message: 'login success',
         data: { access_token, refresh_token }
      });
   } catch (error) {
      return res
         .status(401)
         .json({ status: true, message: 'login fail', data: error });
   }
}

async function Logout(req, res) {
   const user_id = req.userData.sub;
   const token = req.token;

   // remove the refresh token
   await redis_client.del(user_id.toString());

   // blacklist current access token
   await redis_client.set('BL_' + user_id.toString(), token);

   res.json({ status: true, message: 'success.' });
}

function GetAccessToken(req, res) {
   const userId = req.userData.sub;
   const [access_token, refresh_token] = makeRefresh(userId);
   return res.json({
      status: true,
      message: 'success',
      data: { access_token, refresh_token }
   });
}

module.exports = {
   Register,
   Login,
   Logout,
   GetAccessToken
};
