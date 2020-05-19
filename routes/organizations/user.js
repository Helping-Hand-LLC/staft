const express = require('express');
const { isInOrg } = require('../../middleware/access');
const checkObjectId = require('../../middleware/checkObjectId');
const { checkProfile, checkOrg } = require('../../middleware/models');
const {
  getOrgUsers,
  joinPublicOrg,
  leaveOrg
} = require('../../controllers/organizations/user');
const router = express.Router({ mergeParams: true });

/**
 * GET /organizations/:org_id/users
 *
 * @desc retrieve an organization's users
 * @returns {JSON} this organization's user's public information
 * @access private
 */
router.get('/', checkObjectId('org_id'), checkOrg, isInOrg, getOrgUsers);

/**
 * GET /organizations/:org_id/users/join/me
 *
 * @desc user join public organization
 * @returns {JSON} success indicator
 * @access private
 */
router.get('/join/me', checkObjectId('org_id'), checkOrg, joinPublicOrg);

/**
 * PATCH /organizations/:org_id/users/leave/me
 *
 * @desc user removes self from organization
 * @returns {JSON} success indicator
 * @access private
 */
router.patch(
  '/leave/me',
  checkObjectId('org_id'),
  checkProfile,
  checkOrg,
  isInOrg,
  leaveOrg
);

module.exports = router;
