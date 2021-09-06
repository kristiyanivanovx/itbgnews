const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user-schema');

const options = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: 'some_public_key',
   algorithms: ['RS256']
};

module.exports = (passport) => {
   passport.use(
      // jwt_payload.syb is the id for the provided user which is passed in the createToken function
      new JwtStrategy(options, function (jwt_payload, done) {
         User.findOne({ _id: jwt_payload.sub }, function (err, user) {
            if (err) {
               return done(err, false);
            }
            if (user) {
               return done(null, user);
            } else {
               return done(null, false);
            }
         });
      })
   );
};
