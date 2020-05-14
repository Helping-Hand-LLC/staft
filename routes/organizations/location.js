const express = require('express');
const passport = require('passport');
const {
  orgEventLocationRules,
  expValidate
} = require('../../middleware/validator');
const { checkOrg } = require('../../middleware/models');
const {
  getOrgEventLocations,
  createOrgEventLocation
} = require('../../controllers/organizations/location');
const router = express.Router();

/**
 * GET /organizations/:org_id/events/locations
 *
 * @desc retrieve an organization's stored event locations
 * @returns {JSON} this organization's stored event locations
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  getOrgEventLocations
);

/**
 * POST /organizations/:org_id/events/locations
 *
 * @desc create new organization event location
 * @returns {JSON} newly created location
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  orgEventLocationRules(),
  expValidate,
  checkOrg,
  createOrgEventLocation
);

module.exports = router;
