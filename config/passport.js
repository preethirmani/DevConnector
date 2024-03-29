const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../models/User')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretoOrKey;

module.exports =  passport => {
  passport.use(
  new JwtStrategy(opts, (payload, done) => {
      console.log(payload);
      User.findById(payload.id)
          .then(user => {
            if(user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch(err => console.log(err));
    }));
}