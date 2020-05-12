const passport = require('passport');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/keys');

module.exports = {
  login: (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      // db error
      if (err) next(err);
      // bad request
      if (!user) return res.status(400).json(info);

      req.login(user, { session: false }, err => {
        if (err) next(err);
        // jwt
        jwt.sign(
          {
            id: user.id,
            expiresIn: '2 days'
          },
          privateKey,
          (err, token) => {
            if (err) next(err);
            return res.json({ token });
          }
        );
      });
    })(req, res, next);
  },
  register: (req, res, next) => {
    passport.authenticate('register', { session: false }, (err, user, info) => {
      // db error
      if (err) next(err);
      // bad request
      if (!user) return res.status(400).json(info);

      // login newly registered user
      req.login(user, { session: false }, err => {
        if (err) next(err);
        // jwt
        jwt.sign(
          {
            id: user.id,
            expiresIn: '2 days'
          },
          privateKey,
          (err, token) => {
            if (err) next(err);
            return res.json({ token });
          }
        );
      });
    })(req, res, next);
  },
  logout: (req, res) => {
    // TODO: delete the stored jwt token client-side

    // remove req.user
    req.logout();
    res.json({ success: true });
  }
};
