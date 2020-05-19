const passport = require('passport');

module.exports = {
  login: (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      // db error
      if (err) next(err);
      // bad request
      if (!user) return res.status(400).json(info);

      req.login(user, { session: false }, async err => {
        if (err) next(err);
        // generate jwt
        const token = await user.generateAuthToken().catch(err => next(err));
        res.json({ token });
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
      req.login(user, { session: false }, async err => {
        if (err) next(err);
        // generate jwt
        const token = await user.generateAuthToken().catch(err => next(err));
        res.json({ token });
      });
    })(req, res, next);
  },
  logout: (req, res) => {
    // remove req.user
    req.logout();
    res.json({ success: true });
  }
};
