const mongoose = require('mongoose')
const Schema = require("mongoose").Schema


mongoose.connect('mongodb://localhost:27017/Hackernews', () => {
    console.log('Connection ice')
});

const userSchema = new Schema({
    username: String,
    password: String,
    date: Date.now(),
})


module.exports = mongoose.model('userModel', userSchema)