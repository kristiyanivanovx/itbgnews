const mongoose = require('mongoose');
require('dotenv').config();

let ENV = process.env.NODE_ENV || 'development';
let isProduction = ENV === 'production';

let connectionString = isProduction
    ? process.env.MONGODB_REMOTE_CONNECTION_STRING
    : 'mongodb://localhost:27017/itbgnews';

mongoose
    .connect(connectionString)
    .then(() => console.log(`Connected to MongoDB in ${ENV}...`))
    .catch((err) => console.log('Cannot connect to MongoDB. Error: ' + err));

module.exports = mongoose;
