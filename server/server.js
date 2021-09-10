require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const loginRoutes = require('./routes/login-route');
const resetRoutes = require('./routes/reset-pass');
const authRoutes = require('./routes/auth-route');

app.use('', authRoutes);
app.use('', loginRoutes);
app.use('', resetRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}...`);
});
