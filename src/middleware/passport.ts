import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt, { ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { privateKey } from '../config/keys';
import routeError from '../utils/error';
import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // check if user exists
        const user = await User.findOne({ email });

        // email not registered
        if (!user) return done(null, false, { message: 'Invalid credentials' });

        // compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // incorrect password
        if (!isMatch)
          return done(null, false, { message: 'Invalid credentials' });

        // valid user
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // check if user exists
        let user = await User.findOne({ email });

        // email already registered
        if (user)
          return done(null, false, { message: 'Email already registered' });

        // create new user
        user = new User({ email, password });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // user successfully registered
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
