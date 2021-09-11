const jwt = require('jsonwebtoken');
const redis_client = require('../config/redis-connect');
const { validateEmail } = require('../utilities/validateEmail');
function verifyToken(req, res, next) {
   try {
      // Bearer tokenstring
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.userData = decoded;

      req.token = token;

      // verify blacklisted access token.
      redis_client.get('BL_' + decoded.sub.toString(), (err, data) => {
         if (err) throw err;

         if (data === token)
            return res.status(401).json({
               status: false,
               message: 'blacklisted token.'
            });
      });
   } catch (error) {
      console.log(error);
      res.status(401).json({
         status: false,
         message: 'Your session is not valid.',
         data: error
      });
   }
   next();
}

function verifyRefreshToken(req, res, next) {
   const token = req.body.token;
   if (token === null)
      return res
         .status(401)
         .json({ status: false, message: 'Invalid request.' });
   try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      req.userData = decoded;

      // verify if token is in store or not
      redis_client.get(decoded.sub.toString(), (err, data) => {
         if (err) throw err;

         if (data === null)
            res.status(401).json({
               status: false,
               message: 'Invalid request. Token is not in store.'
            });
         if (JSON.parse(data).token !== token)
            res.status(401).json({
               status: false,
               message: 'Invalid request. Token is not same in store.'
            });

         next();
      });
   } catch (error) {
      return res.status(401).json({
         status: true,
         message: 'Your session is not valid.',
         data: error
      });
   }
}

function validateInputData(req, res, next) {
   const re = /\d/;
   const { password, username, email } = req.body;
   let errors = {};

   if (username.length < 6 || username.length > 100000) {
      errors.errorUsername =
         'Username must be at least 7 letters and at most 14.';
   }
   if (!validateEmail(email)) {
      errors.errorEmail = 'The provided email is not valid.';
   }
   if (password.length < 6 || password.length > 100000 || !re.test(password)) {
      errors.errorPassword =
         'The password must have one digit at least, and to be between 7 and 20 symbols';
   }
   // isEmpty [made by kris]
   if (Object.keys(errors).length) {
      res.json(errors);
   }

   next();
}

module.exports = {
   verifyToken,
   verifyRefreshToken,
   validateInputData
};
