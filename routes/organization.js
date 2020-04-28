const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Organization = require('../models/Organization');
const router = express.Router();

/**
 * POST /organization
 *
 * @returns {JSON} create new organization
 */
router.post(
  '/',
  [
    check('uid')
      .escape()
      .isLength({ min: 4 })
      .withMessage('uid must be at least 4 characters'),
    check('adminEmail')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email')
  ],
  async (req, res, next) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { uid, isPrivate, adminEmail } = req.body;

    // format uid
    uid = `com.${uid}`;

    // check if org exists
    let org = await Organization.findOne({ uid }).catch(err => next(err));

    // org already registered
    if (org)
      return res.status(400).json({
        errors: [
          {
            msg:
              'Choose a different unique identifier for your new organization'
          }
        ]
      });

    // validate admin
    const admin = await User.findOne({ email: adminEmail }).catch(err =>
      next(err)
    );

    // have user create admin user first
    if (!admin)
      return res.status(400).json({
        errors: [
          { msg: 'Create an admin user before creating a new organization' }
        ]
      });

    // TODO: set isAdmin of user profile

    // create new org
    org = new Organization({ uid, isPrivate }).save();

    return res.json({ org });
  }
);

module.exports = router;
