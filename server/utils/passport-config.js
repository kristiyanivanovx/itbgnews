const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userSchema = require('../models/user-schema');
// initialize functions for getting email and id from database will be created later
// this function applies to be in session if you get
function initialize(passport) {
   const authenticateUser = async (email, password, done) => {
      const user = await userSchema.findOne({ email });
      if (user == null) {
         return done(null, false, { message: 'No user with that email' });
      }
      console.log(user.password);
      console.log(password);
      try {
         if (bcrypt.compare(password, user.password)) {
            console.log('Everything is great');
            return done(null, user);
         } else {
            return done(null, false, { message: 'Password incorrect' });
         }
      } catch (e) {
         return done(e);
      }
   };
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'email',
            passwordField: 'password'
         },
         authenticateUser
      )
   );
   passport.serializeUser((user, done) => done(null, user._id));
   passport.deserializeUser((id, done) => {
      return done(null, userSchema.findById({ id }));
   });
}

module.exports = initialize;
