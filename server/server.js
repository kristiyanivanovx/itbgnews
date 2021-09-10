require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// routes
const authRoutes = require('./routes/auth-route');
app.use('', authRoutes);

app.listen(process.env.BACKEND_PORT, () => {
   console.log(`Listening on port ${process.env.BACKEND_PORT}`);
});
