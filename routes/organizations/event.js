const express = require('express');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  orgEventRules,
  addOrRemoveEventParticipantRules,
  updateEventParticipantRules,
  expValidate
} = require('../../middleware/validator');
const {
  checkUser,
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
 * @access private
 */
router.get('/', checkObjectId('org_id'), checkOrg, getOrgEvents);

/**
 * GET /organizations/:org_id/events/:event_id
 *
 * @desc retrieve an organization event
 * @returns {JSON} this organization's event with event_id
 * @access private
 */
router.get(
  '/:event_id',
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
  checkObjectId('org_id'),
  checkOrg,
  orgEventRules(),
  expValidate,
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
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  orgEventRules(),
  expValidate,
  updateOrgEvent
);

/**
 * POST /organizations/:org_id/events/:event_id
 *
 * @desc add new event participant
 * @returns {JSON} all event participants
 * @access private
 */
router.post(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  addOrRemoveEventParticipantRules(),
  expValidate,
  addEventParticipant
);

/**
 * DELETE /organizations/:org_id/events/:event_id
 *
 * @desc remove event participant
 * @returns {JSON} success indicator
 * @access private
//  */
router.delete(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  addOrRemoveEventParticipantRules(),
  expValidate,
  removeEventParticipant
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
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  checkUser,
  checkProfile,
  updateEventParticipantRules(),
  expValidate,
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
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  checkOrg,
  checkEvent,
  deleteOrgEvent
);

//----- LOCATIONS -----
router.use('/locations', require('./location'));

module.exports = router;
