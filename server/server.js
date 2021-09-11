require('dotenv').config();
const cookieParser = require('cookie-parser');
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const resetRoutes = require('./routes/resetPassword');
const authRoutes = require('./routes/authRoute');

app.use('', authRoutes);
app.use('', resetRoutes);

app.listen(BACKEND_PORT, () => {
    console.log(`Listening on port ${BACKEND_PORT} in `);
});
