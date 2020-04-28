const express = require('express');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const router = express.Router();

/**
 * GET /user/profile
 *
 * @desc get user profile information from database
 * @returns {JSON} user profile information
 * @access private
 */
router.get('/profile', (req, res) => {
  // TODO: return user profile with specific fields
});

/**
 * POST /user/profile
 *
 * @desc create new user profile
 * @returns {JSON} newly created user profile information
 * @access private
 */
router.post(
  '/profile',
  [
    check('organization').escape(),
    check('name').escape(),
    check('address').isJSON(),
    check('address.street').escape().notEmpty().matches(),
    check('address.city').escape().notEmpty(),
    check('address.state').escape().notEmpty(),
    check('address.zip').notEmpty(),
    check('address.country').escape(),
    check('phone').notEmpty().isMobilePhone(),
    check('birthday').toDate(),
    check('gender').isIn(['male', 'female']),
    check('ssn').escape().notEmpty().matches()
  ],
  (req, res) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
