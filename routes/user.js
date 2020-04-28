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
router.get('/profile', async (req, res, next) => {
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

module.exports = router;
