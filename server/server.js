require('dotenv').config();

const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth-route');
app.use('', authRoutes);

app.listen(5000, () => {
    console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});
