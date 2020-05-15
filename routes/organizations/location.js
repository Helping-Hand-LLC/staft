const express = require('express');
const passport = require('passport');
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
 * @access private
 */
router.get(
  '/stored',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  getOrgEventLocations
);

/**
 * GET /organizations/:org_id/events/locations/query
 *
 * @desc get Google Maps Places API results for a location query
 * @returns {JSON} location results
 * @access private
 */
router.get(
  '/query',
  passport.authenticate('jwt', { session: false }),
  orgEventLocationRules(),
  expValidate,
  checkOrg,
  getGoogleLocationsFromQuery
);

/**
 * POST /organizations/:org_id/events/locations
 *
 * @desc create organization event location
 * @returns {JSON} newly created location
 * @access private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  newOrgEventLocationRules(),
  expValidate,
  checkOrg,
  createOrgEventLocation
);

module.exports = router;