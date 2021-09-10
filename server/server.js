const PORT = process.env.PORT || 5000;

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();

const resetRoutes = require('./routes/resetPassword');
const authRoutes = require('./routes/authRoute');

app.use('', authRoutes);
app.use('', resetRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(PORT || 5000, () => {
    console.log(`Listening on port ${PORT}...`);
});
