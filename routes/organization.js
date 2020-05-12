const express = require('express');
const passport = require('passport');
const {
  newOrgRules,
  updateOrgRules,
  expValidate
} = require('../middleware/validator');
const { checkOrg, checkProfile } = require('../middleware/models');
const {
  getOrg,
  createOrg,
  getPublicOrgs,
  updateOrg,
  deleteOrg,
  getOrgUsers,
  joinPublicOrg,
  leaveOrg,
  getOrgEvents,
  createOrgEvent,
  updateOrgEvent,
  deleteOrgEvent
} = require('../controllers/organization');
const router = express.Router();

/**
 * GET /organizations/:org_id
 *
 * @desc get organization basic information
 * @returns {JSON} organization information
 * @access private
 */
router.get(
  '/:org_id',
  passport.authenticate('jwt', { session: false }), // FIXME: admins only
  checkOrg,
  getOrg
);

/**
 * POST /organizations
 *
 * @desc create a new public or private organization
 * @returns {JSON} newly created organization
 * @access public
 */
router.post('/', newOrgRules(), expValidate, createOrg);

/**
 * GET /organizations
 *
 * @desc get all public organizations
 * @returns {JSON} all previously registered public organizations
 * @access public
 */
router.get('/', getPublicOrgs);

/**
 * PUT /organizations/:org_id
 *
 * @desc update organization
 * @returns {JSON} updated organization information
 * @access private
 */
router.put(
  '/:org_id',
  passport.authenticate('jwt', { session: false }), // FIXME: admins only
  updateOrgRules(),
  expValidate,
  checkOrg,
  updateOrg
);

/**
 * DELETE /organizations/:org_id
 *
 * @desc delete organization and remove from user profiles
 * @returns {JSON} success indicator
 * @access private
 */
router.delete(
  '/:org_id',
  passport.authenticate('jwt', { session: false }), // FIXME: admins only
  deleteOrg
);

//----- USERS -----
/**
 * GET /organizations/:org_id/users
 *
 * @desc retrieve an organization's users
 * @returns {JSON} this organization's user's public information
 * @access private
 */
router.get(
  '/:org_id/users',
  passport.authenticate('jwt', { session: false }), // FIXME: admins only
  checkOrg,
  getOrgUsers
);

/**
 * GET /organizations/:org_id/join/me
 *
 * @desc user join public organization
 * @returns {JSON} success indicator
 * @access private
 */
router.get(
  '/:org_id/join/me',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  joinPublicOrg
);

/**
 * PATCH /organizations/:org_id/leave/me
 *
 * @desc user removes self from organization
 * @returns {JSON} success indicator
 * @access private
 */
router.patch(
  '/:org_id/leave/me',
  passport.authenticate('jwt', { session: false }), // FIXME: admins only
  checkOrg,
  checkProfile,
  leaveOrg
);

//----- EVENTS -----
/**
 * GET /organizations/:org_id/events
 *
 * @desc retrieve an organization's events
 * @returns {JSON} this organization's events
 * @access private
 */
router.get(
  '/:org_id/events',
  passport.authenticate('jwt', { session: false }),
  getOrgEvents
);

/**
 * POST /organizations/:org_id/events
 *
 * @desc create a new organization event
 * @returns {JSON} newly created organization event
 * @access private
 */
router.post(
  '/:org_id/events',
  passport.authenticate('jwt', { session: false }),
  createOrgEvent
);

/**
 * PUT /organizations/:org_id/events/:event_id
 *
 * @desc update organization event
 * @returns {JSON} newly updated organization event
 * @access private
 */
router.put(
  '/:org_id/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  updateOrgEvent
);

/**
 * DELETE /organizations/:org_id/events/:event_id
 *
 * @desc delete organization event
 * @returns {JSON} success indicator
 * @access private
 */
router.delete(
  '/:org_id/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  deleteOrgEvent
);

module.exports = router;
