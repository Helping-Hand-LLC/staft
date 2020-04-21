const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/keys');
const router = express.Router();

/**
 * POST /auth/login
 * 
 * @returns {JSON} containing the logged in worker information and their generated JWT
 */
router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, worker, info) => {
    // db error
    if (err) next(err);
    // bad request
    if (!worker) return res.status(400).json(info.message);

    req.login(worker, { session: false }, (err) => {
      if (err) next(err);
      // jwt
      jwt.sign({
        _id: worker._id,
        isManager: worker.isManager,
        isAdmin: worker.isAdmin,
        expiresIn: '2 days'
      }, privateKey, (err, token) => {
        if (err) next(err);
        res.json({ worker, token });
      });
    });
  })(req, res, next);
});

/**
 * POST /auth/register
 * 
 * @returns {JSON} containing the newly registered worker information and a success message
 */
router.post('/register', (req, res, next) => {
  passport.authenticate('register', { session: false }, (err, worker, info) => {
    // db error
    if (err) next(err);
    // bad request
    if (!worker) return res.status(400).json(info.message);

    return res.json({ worker, message: info.message });
  })(req, res, next);
});

/**
 * GET /auth/logout
 * 
 * @description logs out the currently loggen in worker
 */
router.get('/logout', (req, res) => {
  // TODO: delete the stored jwt token client-side
  // remove req.user
  req.logout();
});

module.exports = router;