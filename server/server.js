require('dotenv').config();

const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const ENV = process.env.NODE_ENV;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const resetRoutes = require('./routes/resetPassword')
const authRoutes = require('./routes/authRoute');

app.use('', authRoutes);
app.use('', resetRoutes);

app.use('', authRoutes);

app.listen(BACKEND_PORT, () => {
    console.log(`Listening on port ${BACKEND_PORT}`)
})