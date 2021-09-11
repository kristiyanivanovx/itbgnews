require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || process.env.LOCALHOST_BACKEND_PORT;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const resetRoutes = require('./routes/resetPassword');
const authRoutes = require('./routes/authRoute');

app.use('', authRoutes);
app.use('', resetRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${ENV}...`);
});
