require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const auth_routes = require('./routes/auth-route');
app.use('', auth_routes);

app.listen(5000, () => {
   console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});
