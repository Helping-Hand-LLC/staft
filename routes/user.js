const express = require('express');
const { newProfileRules, expValidate } = require('../config/validator');
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
router.post('/profile', newProfileRules(), expValidate, (req, res) => {
  // create new profile for this user
  const profile = new Profile().save();

  return res.json({ profile });
});

module.exports = router;
