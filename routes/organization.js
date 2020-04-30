const express = require('express');
const passport = require('passport');
const {
  newOrgRules,
  updateOrgRules,
  expValidate
} = require('../config/validator');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Organization = require('../models/Organization');
const router = express.Router();

/**
 * POST /organizations
 *
 * @desc create a new public or private organization
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

  // ensure admin has completed their profile
  const adminProfile = await Profile.findOne({ user: admin.id });

  if (!adminProfile)
    return res.status(400).json({
      errors: [
        {
          msg:
            'Admin must complete their profile before creating a new organization'
        }
      ]
    });

  // ensure admin has not already been assigned to another organization
  if (adminProfile.isAdmin)
    return res.status(400).json({
      errors: [
        { msg: 'Admin has already been assigned to another organization' }
      ]
    });

  // create new org
  org = new Organization({ uid, isPrivate });
  await org.save();

  // set isAdmin and organization of admin user profile
  adminProfile.isAdmin = true;
  adminProfile.organization = org.id;
  await adminProfile.save();

  return res.json({ org });
});

/**
 * GET /organizations/public
 *
 * @desc get all public organizations
 * @returns {JSON} all previously registered public organizations
 * @access public
 */
router.get('/public', async (req, res, next) => {
  const publicOrgs = await Organization.find({ isPrivate: false })
    .select('uid')
    .catch(err => next(err));

  if (!publicOrgs)
    return res
      .status(404)
      .json({ errors: [{ msg: 'No public organizations' }] });

  return res.json({ publicOrgs });
});

/**
 * PUT /organizations/:org_id
 *
 * @desc update organization
 * @returns {JSON} updated organization information
 * @access private
 */
router.put(
  '/:org_id',
  passport.authenticate('jwt', { session: false }), // TODO: admins only
  updateOrgRules(),
  expValidate,
  async (req, res, next) => {
    // check organization exists
    const org = await Organization.findById(req.params.org_id).catch(err =>
      next(err)
    );

    if (!org)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Organization does not exist' }] });

    const { uid, isPrivate, adminEmails } = req.body;

    // validate admins
    for (let i = 0; i < adminEmails.length; i++) {
      const admin = adminEmails[i];
      const result = await User.findOne({ email: admin }).catch(err =>
        next(err)
      );
      // ensure admin is already a registered user
      if (!result)
        return res.status(400).json({
          errors: [
            {
              msg:
                'Please register all admin emails before assigning to an organization',
              admin
            }
          ]
        });

      // ensure admin has completed their profile
      const adminProfile = await Profile.findOne({
        user: result.id
      }).catch(err => next(err));
      if (!adminProfile)
        return res.status(400).json({
          errors: [
            {
              msg:
                'All admins must complete their profile before being assigned to an organization',
              admin
            }
          ]
        });

      // ensure admin is not already assigned to another organization
      if (
        adminProfile.isAdmin &&
        adminProfile.organization != req.params.org_id
      )
        return res.status(400).json({
          errors: [
            {
              msg: 'Admins cannot be already assigned to another organization',
              admin
            }
          ]
        });

      // add isAdmin and organization to admin
      adminProfile.isAdmin = true;
      adminProfile.organization = org.id;
      await adminProfile.save();
    }

    // existing values should be re-sent so we don't need to check for null
    org.uid = uid;
    org.isPrivate = isPrivate;
    await org.save();

    return res.json({ org });
  }
);

/**
 * GET /organizations/:org_id/users
 *
 * @desc retrieve an organization's users
 * @returns {JSON} this organization's user's public information
 * @access private
 */
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }), // TODO: admins only
  (req, res, next) => {
    // TODO: implement me
  }
);

module.exports = router;
