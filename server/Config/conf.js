const mongoose = require('mongoose');

mongoose
   .connect(process.env.MONGO_CONNECT_STRING)
   .then((er) => console.log('Connected to MongoDB...'))
   .catch((er) => console.log('Cannot connect to MongoDB...'));

module.exports = mongoose;
