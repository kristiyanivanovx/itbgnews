const cors = require('cors');
require('dotenv').config();
const express = require('express');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
const auth_routes = require('./routes/auth-route');
app.use('', auth_routes);

app.listen(5000, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});
