const jsonwebtoken = require('jsonwebtoken');

function createWebToken(user) {
   const _id = user._id;

   const expiresIn = '1 day';

   const payload = {
      sub: _id,
      iat: Date.now()
   };

   const signedToken = jsonwebtoken.sign(payload, 'some_private_key', {
      expiresIn: expiresIn,
      algorithm: 'RS256'
   });

   return {
      token: 'Bearer ' + signedToken,
      expires: expiresIn
   };
}

module.exports = {
   createWebToken
};
