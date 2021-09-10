const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/itbgnews')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Cannot connect to MongoDB. Error: ' + err));

module.exports = mongoose;
