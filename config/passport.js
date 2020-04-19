const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Worker = require('../models/Worker');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { privateKey } = require('./keys');

// middleware to configure our passport local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  // check if user exists
  Worker.findOne({ email: email })
    .then(worker => {
      if (!worker) return done(null, false, { message: 'Email not registered.' });
      bcrypt.compare(password, worker.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) return done(null, false, { message: 'Password incorrect.' });
        return done(null, worker);
      })
    })
    .catch(err => done(err))
}));

// NOTE: the done() verify callback is implemented in passport.authenticate() if auth succeeds, else passport returns 401 Unauthorized

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: privateKey
},
  (jwtPayload, done) => {
    Worker.findById(jwtPayload._id)
      .then(worker => {
        if (!worker) return done(null, false);
        return done(null, worker);
      })
      .catch(err => done(err))
  }
));