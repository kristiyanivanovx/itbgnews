require('dotenv').config();
const mongoose = require('mongoose');

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';

const connectionString =
    isProduction ?
    process.env.MONGODB_REMOTE_CONNECTION_STRING :
    'mongodb://localhost:27017/itbgnews';

mongoose
    .connect(connectionString)
    .then(() => console.log(`Connected to MongoDB in ${ENV}...`))
    .catch((err) => console.log('Cannot connect to MongoDB. Error: ' + err));

module.exports = mongoose;
