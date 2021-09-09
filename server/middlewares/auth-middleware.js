const jwt = require('jsonwebtoken');
const redis_client = require('../config/redis-connect');

function verifyToken(req, res, next) {
   try {
      // Bearer tokenstring
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.userData = decoded;

      req.token = token;

      // varify blacklisted access token.
      redis_client.get('BL_' + decoded.sub.toString(), (err, data) => {
         if (err) throw err;

         if (data === token)
            return res
               .status(401)
               .json({ status: false, message: 'blacklisted token.' });
         next();
      });
   } catch (error) {
      return res.status(401).json({
         status: false,
         message: 'Your session is not valid.',
         data: error
      });
   }
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
            return res.status(401).json({
               status: false,
               message: 'Invalid request. Token is not in store.'
            });
         if (JSON.parse(data).token !== token)
            return res.status(401).json({
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

function validateEmail(email) {
   const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email.toLowerCase());
}

function validateInputData(req, res, next) {
   const re = /\d/;
   const { username, password, email } = req.body;
   if (username.length < 6 || username.length > 14)
      res.send('Username must be at least 6 letters and at most 14');
   else if (!validateEmail(email)) res.send('This email is not valid');
   else if (password.length < 6 || password.length > 20 || !re.test(password)) {
      res.send(
         'The password must have one digit at least, and to be between 6 and 20 symbols'
      );
   }
   next();
}

module.exports = {
   verifyToken,
   verifyRefreshToken,
   validateInputData
};
