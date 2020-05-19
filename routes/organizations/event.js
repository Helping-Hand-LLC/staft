const express = require('express');
const passport = require('passport');
const {
  isManager,
  managerIsEventCreator,
  isInOrg
} = require('../../middleware/access');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  orgEventRules,
  addOrRemoveEventParticipantRules,
  updateEventParticipantRules,
  expValidate
} = require('../../middleware/validator');
const {
  checkProfile,
  checkOrg,
  checkEvent
} = require('../../middleware/models');
const {
  getOrgEvents,
  getOrgEvent,
  createOrgEvent,
  updateOrgEvent,
  addEventParticipant,
  removeEventParticipant,
  updateOrgEventParticipant,
  deleteOrgEvent
} = require('../../controllers/organizations/event');
const router = express.Router({ mergeParams: true });

/**
 * GET /organizations/:org_id/events
 *
 * @desc retrieve an organization's events
 * @returns {JSON} this organization's events
 * @access private isManager
 */
router.get(
  '/',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isManager,
  getOrgEvents
);

/**
 * GET /organizations/:org_id/events/:event_id
 *
 * @desc retrieve an organization event
 * @returns {JSON} this organization's event with event_id
 * @access private isManager
 */
router.get(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isManager,
  checkEvent,
  getOrgEvent
);

/**
 * TODO: GET /organizations/:org_id/events/me
 *
 * @desc retrieve organization events where user is participant
 * @returns {JSON} this organization's events where user is participant
 * @access private
 */

/**
 * TODO: GET /organizations/:org_id/event/:event_id/me
 *
 * @desc retrieve an organization event where user is participant
 * @returns {JSON} organization event where user is participant
 * @access private
 */

/**
 * POST /organizations/:org_id/events
 *
 * @desc create a new organization event
 * @returns {JSON} newly created organization event
 * @access private isManager
 */
router.post(
  '/',
  checkObjectId('org_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  isManager,
  orgEventRules(),
  expValidate,
  createOrgEvent
);

/**
 * PUT /organizations/:org_id/events/:event_id
 *
 * @desc update organization event
 * @returns {JSON} newly updated organization event
 * @access private isManager
 */
router.put(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  orgEventRules(),
  expValidate,
  updateOrgEvent
);

/**
 * POST /organizations/:org_id/events/:event_id
 *
 * @desc add new event participant
 * @returns {JSON} all event participants
 * @access private isManager
 */
router.post(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  addOrRemoveEventParticipantRules(),
  expValidate,
  addEventParticipant
);

/**
 * DELETE /organizations/:org_id/events/:event_id
 *
 * @desc remove event participant
 * @returns {JSON} success indicator
 * @access private isManager
 */
router.delete(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  addOrRemoveEventParticipantRules(),
  expValidate,
  removeEventParticipant
);

/**
 * PATCH /organizations/:org_id/events/:event_id/me
 *
 * @desc event participant confirms status, checks in, or checks out
 * @returns {JSON} modified participant information
 * @access private
 */
router.patch(
  '/:event_id/me',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  passport.authenticate('jwt', { session: false }),
  checkProfile,
  checkOrg,
  checkEvent,
  isInOrg,
  updateEventParticipantRules(),
  expValidate,
  updateOrgEventParticipant
);

/**
 * DELETE /organizations/:org_id/events/:event_id
 *
 * @desc delete organization event
 * @returns {JSON} success indicator
 * @access private isManager
 */
router.delete(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  deleteOrgEvent
);

//----- LOCATIONS -----
router.use('/locations', require('./location'));

module.exports = router;
