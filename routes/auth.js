const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/keys');
const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, worker, info) => {
    // db error
    if (err) return res.status(500).json({ msg: 'Something went wrong.' });
    // bad request
    if (!worker) return res.status(400).json(info.message);

    req.login(worker, { session: false }, (err) => {
      if (err) res.send(err);
      // jwt
      jwt.sign({ _id: worker._id, isManager: worker.isManager, isAdmin: worker.isAdmin }, privateKey, (err, token) => {
        if (err) res.send(err);
        res.json({ worker, token });
      });
    });
  })(req, res, next);
});

router.post('/register', (req, res, next) => {
  passport.authenticate('register', { session: false }, (err, worker, info) => {
    // db error
    if (err) return res.status(500).json({ msg: 'Something went wrong.' });
    // bad request
    if (!worker) return res.status(400).json(info.message);

    return res.json({ worker, message: info.message });
  })(req, res, next);
});

module.exports = router;