const passport = require('passport');
const express = require('express');
const userSchema = require('../models/user-schema');
const router = express.Router();
const { hash } = require('bcrypt');
router.use(express.json());
const crypto = require('crypto');
const {mail} = require('../models/mailMessage');

const { verifyMessage } = require('../models/mailMessage');
const { verify } = require('crypto');

router.get('/', isAuthenticated, (req, res) => {
   console.log(req.isAuthenticated());
   res.send('not working');
});

router.get(
   '/login',
   passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/register'
   }),
   (req, res) => {}
);

router.post('/register', async (req, res) => {
   const { email, password, username } = req.body;
   const encryptedPassword = await hash(password, 10);
   try {
      const newUser = new userSchema({
         username,
         email,
         password: encryptedPassword,
         date: Date.now()
      });
      await newUser.save();

      let code = crypto.randomBytes(8).toString('hex');
      const msg = verifyMessage(email, code);
    
    mail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
      res.json({ message: 'success', data: 'it gets login successfully' });
   } catch (er) {
      console.log(er);
      res.json({
         message: 'error',
         data: 'This email or the username is already taken'
      });
   }
});

router.get('/register', (req, res) => {
   console.log(req.isAuthenticated());
   res.send('fine');
});

module.exports = router;

function isAuthenticated(req, res, done) {
   if (req.isAuthenticated()) {
      done();
   }
   res.redirect('/login');
}
