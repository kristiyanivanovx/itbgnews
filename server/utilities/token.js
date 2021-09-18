require('dotenv').config();
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConfig');
const cookieParser = require('cookie-parser');

function generateAccessToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TIME,
  });
}

function cashAndReturnRefreshToken(userId) {
  console.log(process.env.JWT_REFRESH_SECRET);
  const refreshToken = jwt.sign(
    { sub: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TIME },
  );

  redisClient.get(userId.toString(), (err, data) => {
    if (err) {
      console.log(err);
    }

    redisClient.set(userId.toString(), JSON.stringify({ token: refreshToken }));

    redisClient.expire(userId.toString(), 60 * 60 * 24 * 30);
  });

  return refreshToken;
}

function makeRefresh(userId) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = cashAndReturnRefreshToken(userId);
  return [accessToken, refreshToken];
}

module.exports = {
  makeRefresh,
};
