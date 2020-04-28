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
 * @desc create or update new user profile
 * @returns {JSON} newly created / updated user profile information
 * @access private
 */
router.post('/profile', newProfileRules(), expValidate, async (req, res) => {
  const {
    organization,
    name,
    address,
    phone,
    birthday,
    gender,
    ssn
  } = req.body;

  // build profileFields
  let profileFields = {};

  // check if profile exists
  let profile = await Profile.findOne({ user: req.user.id });

  // update profile
  if (profile) {
  }

  // create new profile for this user
  profile = new Profile();
  await profile.save();

  return res.json({ profile });
});

module.exports = router;
