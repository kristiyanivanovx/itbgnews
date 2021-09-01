// const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const settings = require('./config/settings')[env];

const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

require('./config/database')(settings);
require('./config/routes')(app);

app.listen(
    settings.port,
    () => console.log(`Server running on port ${settings.port}, env is ${env}...`)
);
