const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Worker = require('../models/Worker');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { privateKey } = require('./keys');

// middleware to configure our passport local strategy
passport.use('login', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
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

passport.use('register', new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
  (req, email, password, done) => {
    const { phone, passwordConfirm } = req.body;
    // validate user input
    // REVIEW: Worker.validate() may throw some of these errors already
    if (!email || !phone || !password || !passwordConfirm) {
      return done(null, false, { message: 'Please fill in all fields.' });
    }
    if (password !== passwordConfirm) {
      return done(null, false, { message: 'Passwords do not match.' });
    }
    if (password.length < 6) {
      return done(null, false, { message: 'Password must be at least 6 characters.' });
    }

    // check if user exists
    Worker.findOne({ email: email })
      .then(res => {
        if (res) return done(null, false, { message: 'Email already registered.' });
        // create new Worker
        Worker.create({ name: email.split('@')[0], phone, email, password })
          .then(worker => done(null, worker, { message: 'Registration successful. Please log in.' }))
          .catch(err => done(err))
      })
      .catch(err => console.error(err))
  }
));

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

// NOTE: the done() verify callback is implemented in passport.authenticate() if auth succeeds, else passport returns 401 Unauthorized