const redis = require('redis');

const redis_client = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
});

redis_client.on('connect', function () {
    console.log('Connected to Redis...');
});

redis_client.on('error', function (error) {
    console.error(error);
});

module.exports = redis_client;
