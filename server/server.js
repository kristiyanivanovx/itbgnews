const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const usersSchema = require('./models/user-schema');
const initializePassport = require('./utils/passport-config');
const routes = require('./routes/login-route');

initializePassport(passport);
// all middlewares needed for app
app.use(
   session({
      secret: '12',
      resave: false,
      saveUninitialized: false
   })
);
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use('', routes);
app.listen(5000);
