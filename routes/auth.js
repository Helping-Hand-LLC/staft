const express = require('express');
const passport = require('passport');
const {
  loginRules,
  registerRules,
  expValidate
} = require('../middleware/validator');
const { login, register, logout } = require('../controllers/auth');
const router = express.Router();

/**
 * POST /auth/login
 *
 * @desc login a previously registered user
 * @returns {JSON} newly generated JWT
 * @access public
 */
router.post('/login', loginRules(), expValidate, login);

/**
 * POST /auth/register
 *
 * @desc register a new user to the database and automatically login that user
 * @returns {JSON} newly generated JWT
 * @access public
 */
router.post('/register', registerRules(), expValidate, register);

/**
 * GET /auth/logout
 *
 * @desc logs out the currently loggen in user
 * @returns {JSON} success indicator
 * @access private
 */
router.get('/logout', passport.authenticate('jwt', { session: false }), logout);

module.exports = router;
