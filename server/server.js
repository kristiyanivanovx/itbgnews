// const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const settings = require('./config/settings')[env];

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());

app.use(cors());

app.post('/api/register', (req, res) => {
    console.log(req.body);
});

require('./config/database')(settings);
require('./config/routes')(app);

app.listen(
    settings.port,
    () => console.log(`Server running on port ${settings.port}, env is ${env}...`)
);
