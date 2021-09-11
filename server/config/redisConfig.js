const redis = require('redis');
require('dotenv').config();

let ENV = process.env.NODE_ENV || 'development';
let isProduction = ENV === 'production';

let host = isProduction ? process.env.REDIS_HOST : '127.0.0.1';
let port = isProduction ? process.env.REDIS_PORT : 6379;
let password = isProduction ? process.env.REDIS_PASSWORD : 'pass';

const redis_client = redis.createClient({
    host: host,
    port: port,
    password: password,
});

redis_client.on('connect', function () {
    console.log(
        `Connected to Redis in ${ENV} at ${host}:${port} with password ${password}`,
    );
});

redis_client.on('error', function (error) {
    console.error(error);
});

module.exports = redis_client;
