// const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const settings = require('./config/settings')[env];

const cors = require('cors');

const express = require('express');
const app = express();
app.use(cors())

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


app.post('/login-page', (req , res) => {
    //
})