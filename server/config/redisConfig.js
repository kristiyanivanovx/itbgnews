require('dotenv').config();
const redis = require('redis');
const { getEnvironmentInfo } = require('../utilities/common');

const [ENV, isProduction] = getEnvironmentInfo();

// when you use docker-compose, swap '127.0.0.1' with 'redis' in the below line
const host = isProduction ? process.env.REDIS_HOST : '127.0.0.1';
const port = isProduction ? process.env.REDIS_PORT : 6379;
const password = isProduction ? process.env.REDIS_PASSWORD : 'pass';

const redisClient = redis.createClient({
  host: host,
  port: port,
  password: password,
});

console.log(
  `Attempting to connect Redis to host ${host}, port ${port} in ${ENV}`,
);

redisClient.on('connect', function () {
  console.log(`Connected to Redis in ${ENV} at ${host}:${port}.`);
});

redisClient.on('error', function (error) {
  console.error(error);
});

module.exports = redisClient;
