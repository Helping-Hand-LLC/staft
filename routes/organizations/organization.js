const express = require('express');
const passport = require('passport');
const { isAdmin, isInOrg } = require('../../middleware/access');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  newOrgRules,
  updateOrgRules,
  addWorkerToOrgRules,
  expValidate
} = require('../../middleware/validator');
const { checkOrg } = require('../../middleware/models');
const {
  getOrg,
  createOrg,
  getPublicOrgs,
  updateOrg,
  addWorker,
  deleteOrg
} = require('../../controllers/organizations/organization');
const router = express.Router();

/**
 * GET /organizations
 *
 * @desc get all public organizations
 * @returns {JSON} all previously registered public organizations
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getPublicOrgs
);

/**
 * GET /organizations/:org_id/me
 *
 * @desc get this user's organization basic information
 * @returns {JSON} organization information (uid, isPrivate)
 * @access private
 */
router.get(
  '/:org_id/me',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isInOrg,
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
 * PUT /organizations/:org_id
 *
 * @desc update organization
 * @returns {JSON} updated organization information
 * @access private isAdmin
 */
router.put(
  '/:org_id',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isAdmin,
  updateOrgRules(),
  expValidate,
  updateOrg
);

/**
 * PATCH /organizations/:org_id/addWorker
 *
 * @desc add worker to this organization
 * @returns {JSON} updated (organization) profile for this worker
 * @access private isAdmin
 */
router.patch(
  '/:org_id/addWorker',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isAdmin,
  addWorkerToOrgRules(),
  expValidate,
  addWorker
);

/**
 * DELETE /organizations/:org_id
 *
 * @desc delete organization and remove from user profiles
 * @returns {JSON} success indicator
 * @access private isAdmin
 */
router.delete(
  '/:org_id',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isAdmin,
  deleteOrg
);

//----- USERS -----
router.use(
  '/:org_id/users',
  passport.authenticate('jwt', { session: false }),
  require('./user')
);

//----- EVENTS -----
router.use('/:org_id/events', require('./event'));

module.exports = router;