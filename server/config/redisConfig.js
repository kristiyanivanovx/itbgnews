const redis = require('redis');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

const host = isProduction ? process.env.REDIS_HOST : '127.0.0.1';
const port = isProduction ? process.env.REDIS_PORT : 6379;
const password = isProduction ? process.env.REDIS_PASSWORD : 'pass';

const redisClient = redis.createClient({
  host: host,
  port: port,
  password: password,
});

console.log(
  `Attempting to connect Redis to host ${host}, port ${port}, ${password}`,
);

redisClient.on('connect', function () {
  console.log(`Connected to Redis in ${ENV} at ${host}:${port}.`);
});

redisClient.on('error', function (error) {
  console.error(error);
});

module.exports = redisClient;
