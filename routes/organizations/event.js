const express = require('express');
const passport = require('passport');
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
} = require('../../controllers/organization');
const router = express.Router();

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
  '/:org_id/events/:event_id',
  passport.authenticate('jwt', { session: false }),
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
  '/:org_id/events',
  passport.authenticate('jwt', { session: false }),
  orgEventRules(),
  expValidate,
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
  '/:org_id/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  orgEventRules(),
  expValidate,
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
  '/:org_id/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  orgEventParticipantRules(),
  expValidate,
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
  '/:org_id/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  checkOrg,
  checkEvent,
  deleteOrgEvent
);

module.exports = router;
