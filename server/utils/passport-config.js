const passportJWT = require('passport-jwt');
const user = require('../models/user-schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
passport.use(
   new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password'
      },
      function (email, password, next) {
         return user
            .findOne({ email, password })
            .then((user) => {
               if (!user) {
                  return next(null, false, {
                     message: 'Incorrect email or password.'
                  });
               }
               return next(null, user, {
                  message: 'Logged In Successfully'
               });
            })
            .catch((err) => {
               console.log(4);
               return next(err);
            });
      }
   )
);

// passport.use(
//    new JWTStrategy(
//       {
//          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//          secretOrKey: 'your_jwt_secret'
//       },
//       function (jwtPayload, cb) {
//          //find the user in db if needed
//          return user
//             .findById(jwtPayload.id)
//             .then((user) => {
//                return cb(null, user);
//             })
//             .catch((err) => {
//                return cb(err);
//             });
//       }
//    )
// );

module.exports = {
   passport
};
