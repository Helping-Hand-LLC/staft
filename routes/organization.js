const express = require('express');
const { newOrgRules, expValidate } = require('../config/validator');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Organization = require('../models/Organization');
const router = express.Router();

/**
 * POST /organization
 *
 * @desc create a new organization
 * @returns {JSON} newly created organization
 * @access public
 */
router.post('/', newOrgRules(), expValidate, async (req, res, next) => {
  const { uid, isPrivate, adminEmail } = req.body;

  // check if org exists
  let org = await Organization.findOne({ uid }).catch(err => next(err));

  // org already registered
  if (org)
    return res.status(400).json({
      errors: [
        {
          msg: 'Choose a different unique identifier for your new organization'
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

  // create new org
  org = new Organization({ uid, isPrivate });
  await org.save();

  // set isAdmin and organization of admin user profile
  let adminProfile = await Profile.findOneAndUpdate(
    { user: admin.id },
    {
      $set: {
        isAdmin: true,
        organization: org.id
      }
    },
    { new: true }
  );
  console.log(adminProfile);

  return res.json({ org });
});

/**
 * GET /organization/users
 *
 * @desc retrieve an organization's users
 * @returns {JSON} this organization's user's public information
 * @access private
 */
router.get('/profile', (req, res, next) => {
  // TODO: implement me
});

module.exports = router;
