require('dotenv').config();
const mongoose = require('mongoose');
const { getEnvironmentInfo } = require('../utilities/common');

const [ENV, isProduction] = getEnvironmentInfo();

console.log('NODE_ENV' + process.env.NODE_ENV || '');

// with docker-compose, use 'mongodb' instead of 'localhost'
const connectionString = isProduction
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017/itbgnews';

mongoose
  .connect(connectionString)
  .then(() => console.log(`Connected to MongoDB in ${ENV}...`))
  .catch((err) => console.log('Cannot connect to MongoDB. Error: ' + err));

module.exports = mongoose;
