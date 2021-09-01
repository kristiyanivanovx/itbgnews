// const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const settings = require('./config/settings')[env];

const cors = require('cors');

const express = require('express');
const app = express();
app.use(cors())

const mongoose = require("mongoose");
const port = 5000;
app.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true}).then(() => {
    console.log("SUCCESS");
});

const schema = new mongoose.Schema({
    username: String,
});

const users = mongoose.model('Scehma', schema);
//users.collection.createIndex({ email: 1 }, {unique: true});

app.get('/',  async (req, res) => {
    res.sendFile(__dirname + "\\index.html");

    users.find({} , (err, q) => {
        console.log("test");
        if(err) console.log(err);
        q.map(function(user) {
            console.log(user);

        });

    });
})

app.listen(port, () => console.log(`Server running on port ${port}`));


app.post('/login', async (req , res) => {
    let name = req.body.username;
    console.log(name);
    const user = new users({username: name});

    user.save().then(doc => {
        console.log("SUCCESS: " + doc);
    }).catch(err => {
        console.log("ERROR:" + err);
    });
})