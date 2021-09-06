const passport = require('passport');
const express = require('express');
const userSchema = require('../models/user-schema');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createWebToken } = require('../utils/query-methods');

router.use(express.json());

router.get('/login', (req, res) => {
   res.json({
      status: 'success',
      data: 'Get in login'
   });
});

// perfect
router.post('/register', async function (req, res, next) {
   const { password, username, email } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new userSchema({
      username,
      email,
      hashedPassword
   });

   try {
      await newUser.save().then((user) => {
         res.json({ success: true, user: user });
      });
   } catch (err) {
      console.log(err.message);
      if (err.message === 'Duplicated') {
         res.status(1100).json({
            status: 'error',
            message: 'This email or username is already taken'
         });
      }
      if (err) res.json({ success: false, msg: err });
   }
});

router.post('/login', function (req, res, next) {
   userSchema
      .findOne({ username: req.body.username })
      .then((user) => {
         if (!user) {
            return res
               .status(401)
               .json({ success: false, msg: 'could not find user' });
         }
         const isValid = bcrypt.compare(passport, user.password);
         if (isValid) {
            const tokenObject = createWebToken(user);
            res.status(200).json({
               success: true,
               token: tokenObject.token,
               expiresIn: tokenObject.expires
            });
         } else {
            res.status(401).json({
               success: false,
               msg: 'you entered the wrong password'
            });
         }
      })
      .catch((err) => {
         next(err);
      });
});

router.get('/', (req, res) => {
   res.send('letts see the fucking comments baby');
});

module.exports = router;
