const express = require('express');
const app = express();
const passport = require('passport');
const routes = require('./routes/login-route');
const flash = require('express-flash');
// all middlewares needed for app

app.use(flash());
app.use(passport.initialize());
app.use('', routes);
app.listen(5000);
