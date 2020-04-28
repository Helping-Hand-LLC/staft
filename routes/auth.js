const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const generateUserJwt = require('../config/jwt');
const router = express.Router();

/**
 * POST /auth/login
 *
 * @desc login a previously registered user
 * @returns {JSON} newly generated JWT
 * @access public
 */
router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email'),
    check('password').escape()
  ],
  (req, res, next) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate('login', { session: false }, (err, user, info) => {
      // db error
      if (err) next(err);
      // bad request
      if (!user) return res.status(400).json(info);

      req.login(user, { session: false }, err => {
        if (err) next(err);
        // jwt
        const token = generateUserJwt(user);
        return res.json({ token });
      });
    })(req, res, next);
  }
);

/**
 * POST /auth/register
 *
 * @desc register a new user to the database and automatically login that user
 * @returns {JSON} newly generated JWT
 * @access public
 */
router.post(
  '/register',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email'),
    check('password')
      .escape()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    check('passwordConfirm')
      .escape()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      })
  ],
  (req, res, next) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate('register', { session: false }, (err, user, info) => {
      // db error
      if (err) next(err);
      // bad request
      if (!user) return res.status(400).json(info);

      // login newly registered user
      req.login(user, { session: false }, err => {
        if (err) next(err);
        // jwt
        const token = generateUserJwt(user);
        return res.json({ token });
      });
    })(req, res, next);
  }
);

/**
 * GET /auth/logout
 *
 * @desc logs out the currently loggen in user
 * @returns {null}
 * @access private
 */
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // TODO: delete the stored jwt token client-side

    // remove req.user
    req.logout();
  }
);

module.exports = router;
