const redis = require('redis');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

const host = isProduction ? process.env.REDIS_HOST : '127.0.0.1';
const port = isProduction ? process.env.REDIS_PORT : 6379;
const password = isProduction ? process.env.REDIS_PASSWORD : 'pass';

const redis_client = redis.createClient({
    host: host,
    port: port,
    password: password,
});

redis_client.on('connect', function () {
    console.log(`Connected to Redis in ${ENV} at ${host}:${port}.`);
});

redis_client.on('error', function (error) {
    console.error(error);
});

module.exports = redis_client;
