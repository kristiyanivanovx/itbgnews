const jwt = require('jsonwebtoken');
const redis_client = require('../config/redis-connect');
function generateAccessToken(userId) {
   return jwt.sign({ sub: userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME
   });
}
function cashAndReturnRefreshToken(userId) {
   const refresh_token = jwt.sign(
      { sub: userId },
      process.env.JWT_REFRESH_SECRET,
      {
         expiresIn: process.env.JWT_REFRESH_TIME
      }
   );
   redis_client.get(userId.toString(), (err, data) => {
      if (err) throw err;

      redis_client.set(
         userId.toString(),
         JSON.stringify({ token: refresh_token })
      );
   });

   return refresh_token;
}

function makeRefresh(userId) {
   const accessToken = generateAccessToken(userId);
   const refreshToken = cashAndReturnRefreshToken(userId);
   return [accessToken, refreshToken];
}

module.exports = {
   makeRefresh
};
