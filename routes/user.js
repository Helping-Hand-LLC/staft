const express = require('express');
const { newProfileRules, expValidate } = require('../config/validator');
const User = require('../models/User');
const Profile = require('../models/Profile');
const router = express.Router();

/**
 * GET /user/me
 *
 * @desc get basic user information from database
 * @returns {JSON} user type, email, password, and date
 * @access private
 */
router.get('/me', async (req, res, next) => {
  // TODO: implement me
});

/**
 * GET /user/profile/me
 *
 * @desc get user profile information from database
 * @returns {JSON} user profile information
 * @access private
 */
router.get('/profile/me', async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).catch(err =>
    next(err)
  );

  if (!profile)
    return res
      .status(404)
      .json({ errors: [{ msg: 'Profile could not be found for this user' }] });

  const result = profile.populate('user', ['type']);
  return res.json({ result });
});

/**
 * POST /user/profile
 *
 * @desc create or update new user profile
 * @returns {JSON} newly created / updated user profile information
 * @access private
 */
router.post(
  '/profile',
  newProfileRules(),
  expValidate,
  async (req, res, next) => {
    let { organization } = req.body;
    const { name, address, phone, birthday, gender, ssn } = req.body;

    // set organization to null if not submitted
    if (!organization) {
      organization = null;
    }

    // Using upsert option (creates new doc if no match is found)
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          user: req.user.id,
          organization,
          name,
          address,
          phone,
          birthday,
          gender,
          ssn
        }
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    ).catch(err => next(err));
    return res.json({ profile });
  }
);

/**
 * DELETE /user/profile/me
 *
 * @desc delete user and their associated profile
 * @returns {JSON} success indicator
 * @access private
 */
router.delete('/profile/me', async (req, res, next) => {
  // remove user profile
  await Profile.findOneAndDelete({ user: req.user.id }).catch(err => next(err));
  // remove user
  await User.findOneAndDelete({ _id: req.user.id }).catch(err => next(err));

  return res.json({ success: true });
});

module.exports = router;
