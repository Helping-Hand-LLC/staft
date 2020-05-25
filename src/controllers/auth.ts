import passport from 'passport';
import MiddlewareFn from '../config/middleware';

const login: MiddlewareFn = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    // db error
    if (err) return next(err);
    // bad request
    if (!user) return res.status(400).json(info);

    req.login(user, { session: false }, async err => {
      if (err) next(err);
      // generate jwt
      try {
        const token = await user.generateAuthToken();
        res.json({ token });
      } catch (err) {
        next(err);
      }
    });
  })(req, res, next);
};

const register: MiddlewareFn = (req, res, next) => {
  passport.authenticate('register', { session: false }, (err, user, info) => {
    // db error
    if (err) return next(err);
    // bad request
    if (!user) return res.status(400).json(info);

    // login newly registered user
    req.login(user, { session: false }, async err => {
      if (err) next(err);
      // generate jwt
      try {
        const token = await user.generateAuthToken();
        res.json({ token });
      } catch (err) {
        next(err);
      }
    });
  })(req, res, next);
};

const logout: MiddlewareFn = (req, res) => {
  // remove req.user
  req.logout();
  res.json({ success: true });
};

export default { login, register, logout };
