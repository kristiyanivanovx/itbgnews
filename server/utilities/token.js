require('dotenv').config();
const jwt = require('jsonwebtoken');
const redis_client = require('../config/redisConfig');
const cookieParser = require('cookie-parser');
function generateAccessToken(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TIME,
    });
}

function cashAndReturnRefreshToken(userId) {
    console.log(process.env.JWT_REFRESH_SECRET);
    const refresh_token = jwt.sign(
        { sub: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TIME },
    );
    redis_client.get(userId.toString(), (err, data) => {
        if (err) {
            console.log(err);
        }

        redis_client.set(
            userId.toString(),
            JSON.stringify({ token: refresh_token }),
        );
        redis_client.expire(userId.toString(), 60 * 60 * 24 * 30);
    });

    return refresh_token;
}

function makeRefresh(userId) {
    const accessToken = generateAccessToken(userId);
    const refreshToken = cashAndReturnRefreshToken(userId);
    return [accessToken, refreshToken];
}

module.exports = {
    makeRefresh,
};