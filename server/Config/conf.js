const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/itbgnews')
    .then((er) => console.log('Connected to MongoDB...'))
    .catch((er) => console.log('Cannot connect to MongoDB'));

module.exports = mongoose;
