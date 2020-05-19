const express = require('express');
const passport = require('passport');
const { isManager } = require('../../middleware/access');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  orgEventLocationRules,
  newOrgEventLocationRules,
  expValidate
} = require('../../middleware/validator');
const { checkOrg } = require('../../middleware/models');
const {
  getOrgEventLocations,
  getGoogleLocationsFromQuery,
  createOrgEventLocation
} = require('../../controllers/organizations/location');
const router = express.Router({ mergeParams: true });

/**
 * GET /organizations/:org_id/events/locations/stored
 *
 * @desc retrieve an organization's stored event locations
 * @returns {JSON} this organization's stored event locations
 * @access private isManager
 */
router.get(
  '/stored',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isManager,
  getOrgEventLocations
);

/**
 * GET /organizations/:org_id/events/locations/query
 *
 * @desc get Google Maps Places API results for a location query
 * @returns {JSON} location results
 * @access private isManager
 */
router.get(
  '/query',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isManager,
  orgEventLocationRules(),
  expValidate,
  getGoogleLocationsFromQuery
);

/**
 * POST /organizations/:org_id/events/locations
 *
 * @desc create organization event location
 * @returns {JSON} newly created location
 * @access private isManager
 */
router.post(
  '/',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isManager,
  newOrgEventLocationRules(),
  expValidate,
  createOrgEventLocation
);

module.exports = router;
