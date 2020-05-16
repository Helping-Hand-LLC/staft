const express = require('express');
const passport = require('passport');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  orgEventRules,
  orgEventParticipantRules,
  expValidate
} = require('../../middleware/validator');
const { checkUser, checkOrg, checkEvent } = require('../../middleware/models');
const {
  getOrgEvents,
  getOrgEvent,
  createOrgEvent,
  updateOrgEvent,
  updateOrgEventParticipant,
  deleteOrgEvent
} = require('../../controllers/organizations/event');
const router = express.Router({ mergeParams: true });

/**
 * GET /organizations/:org_id/events
 *
 * @desc retrieve an organization's events
 * @returns {JSON} this organization's events
 * @access private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkObjectId('org_id'),
  checkOrg,
  getOrgEvents
);

/**
 * GET /organizations/:org_id/events/:event_id
 *
 * @desc retrieve an organization event
 * @returns {JSON} this organization's event with event_id
 * @access private
 */
router.get(
  '/:event_id',
  passport.authenticate('jwt', { session: false }),
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  getOrgEvent
);

/**
 * POST /organizations/:org_id/events
 *
 * @desc create a new organization event
 * @returns {JSON} newly created organization event
 * @access private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  orgEventRules(),
  expValidate,
  checkObjectId('org_id'),
  checkOrg,
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
  '/:event_id',
  passport.authenticate('jwt', { session: false }),
  orgEventRules(),
  expValidate,
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  updateOrgEvent
);

/**
 * PATCH /organizations/:org_id/events/:event_id
 *
 * @desc event participant confirms status, checks in, or checks out
 * @returns {JSON} modified participant information
 * @access private
 */
router.patch(
  '/:event_id',
  passport.authenticate('jwt', { session: false }),
  orgEventParticipantRules(),
  expValidate,
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  checkUser,
  updateOrgEventParticipant
);

/**
 * DELETE /organizations/:org_id/events/:event_id
 *
 * @desc delete organization event
 * @returns {JSON} success indicator
 * @access private
 */
router.delete(
  '/:event_id',
  passport.authenticate('jwt', { session: false }),
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  deleteOrgEvent
);

//----- LOCATIONS -----
router.use('/locations', require('./location'));

module.exports = router;
