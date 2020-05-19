const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { privateKey } = require('../config/keys');
const { routeError } = require('../utils/error');

// middleware to configure our passport local strategy
passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // check if user exists
      const user = await User.findOne({ email }).catch(err => done(err));

      // email not registered
      if (!user) return done(null, false, routeError('Invalid credentials'));

      // compare hashed password
      const isMatch = await bcrypt
        .compare(password, user.password)
        .catch(err => done(err));

      // incorrect password
      if (!isMatch) return done(null, false, routeError('Invalid credentials'));

      // valid user
      return done(null, user);
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // check if user exists
      let user = await User.findOne({ email }).catch(err => done(err));

      // email already registered
      if (user)
        return done(null, false, routeError('Email already registered'));

      // create new user
      user = new User({ email, password });

      // encrypt password
      const salt = await bcrypt.genSalt(10).catch(err => done(err));
      user.password = await bcrypt.hash(password, salt).catch(err => done(err));
      await user.save();

      // user successfully registered
      return done(null, user);
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: privateKey
    },
    // if jwtPayload is passed, the sent JWT has been verified
    async (jwtPayload, done) => {
      // pass userJwtPayload details to next middleware
      try {
        return done(null, jwtPayload.user);
      } catch (err) {
        done(err, null, routeError('Invalid token'));
      }
    }
  )
);
