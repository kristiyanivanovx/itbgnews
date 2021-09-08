const { passport } = require('../utils/passport-config');
const express = require('express');
const userSchema = require('../models/user-schema');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '../../', 'id_rsa_priv.pem');
const privateKey = fs.readFileSync(pathToKey, 'utf8');
router.use(express.json());
router.post('/', authenticateToken, async (req, res) => {
   res.send(req.user);
});

router.post('/login', authenticateToken, async (req, res) => {
   res.send(req.user);
});

// perfect
router.post('/register', async function (req, res) {
   const { password, username, email } = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new userSchema({
      username,
      email,
      password: hashedPassword
   });
   await newUser
      .save()
      .then((user) => {
         jwt.sign(
            { newUser },
            privateKey,
            { algorithm: 'RS256' },
            (er, token) => {
               if (er) console.log(er);
               res.status(200).json({ success: true, user: user, token });
            }
         );
      })
      .catch((er) => {
         console.log(er);
         res.status(401).json({
            status: 'error',
            message: 'This email or username is already taken'
         });
      });
});

function authenticateToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (token == null) return res.sendStatus(401);
   jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      console.log(user);
      req.user = user.newUser;
      next();
   });
}

module.exports = router;
