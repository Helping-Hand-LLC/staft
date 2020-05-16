const express = require('express');
const passport = require('passport');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  newOrgRules,
  updateOrgRules,
  expValidate
} = require('../../middleware/validator');
const { checkOrg } = require('../../middleware/models');
const {
  getOrg,
  createOrg,
  getPublicOrgs,
  updateOrg,
  deleteOrg
} = require('../../controllers/organizations/organization');
const router = express.Router();

/**
 * GET /organizations
 *
 * @desc get all public organizations
 * @returns {JSON} all previously registered public organizations
 * @access public
 */
router.get('/', getPublicOrgs);

/**
 * GET /organizations/:org_id
 *
 * @desc get organization basic information
 * @returns {JSON} organization information
 * @access private
 */
router.get(
  '/:org_id',
  passport.authenticate('jwt', { session: false }),
  checkObjectId('org_id'),
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
 * PUT /organizations/:org_id
 *
 * @desc update organization
 * @returns {JSON} updated organization information
 * @access private
 */
router.put(
  '/:org_id',
  passport.authenticate('jwt', { session: false }),
  updateOrgRules(),
  expValidate,
  checkObjectId('org_id'),
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
  passport.authenticate('jwt', { session: false }),
  checkObjectId('org_id'),
  checkOrg,
  deleteOrg
);

//----- USERS -----
router.use('/:org_id/users', require('./user'));

//----- EVENTS -----
router.use('/:org_id/events', require('./event'));

module.exports = router;
