const express = require('express');
const passport = require('passport');
const { checkProfile, checkOrg } = require('../../middleware/models');
const {
  getOrgUsers,
  joinPublicOrg,
  leaveOrg
} = require('../../controllers/organization');
const router = express.Router();

/**
 * GET /organizations/:org_id/users
 *
 * @desc retrieve an organization's users
 * @returns {JSON} this organization's user's public information
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  getOrgUsers
);

/**
 * GET /organizations/:org_id/users/join/me
 *
 * @desc user join public organization
 * @returns {JSON} success indicator
 * @access private
 */
router.get(
  '/join/me',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  joinPublicOrg
);

/**
 * PATCH /organizations/:org_id/users/leave/me
 *
 * @desc user removes self from organization
 * @returns {JSON} success indicator
 * @access private
 */
router.patch(
  '/leave/me',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  checkProfile,
  leaveOrg
);

module.exports = router;
