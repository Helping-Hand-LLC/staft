import { Router } from 'express';
import locationRouter from './location';
import {
  jwtAuth,
  isManager,
  managerIsEventCreator,
  isInOrg,
  isInEvent
} from '../middleware/access';
import checkObjectId from '../middleware/checkObjectId';
import {
  createOrUpdateOrgEventRules,
  addOrRemoveEventParticipantRules,
  updateEventParticipantRules,
  expValidate
} from '../middleware/validator';
import {
  checkProfile,
  checkOrg,
  checkEvent,
  checkEventParticipant
} from '../middleware/checkModel';
import * as EventController from '../controllers/event';

const router = Router({ mergeParams: true });

router.get(
  '/',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isManager,
  EventController.getAllOrgEvents
);

router.get(
  '/me',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isInOrg,
  EventController.getAllMyOrgEvents
);

router.get(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  jwtAuth,
  checkOrg,
  isManager,
  checkEvent,
  EventController.getSingleOrgEvent
);

router.get(
  '/:event_id/me',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isInOrg,
  checkEvent,
  isInEvent,
  EventController.getMySingleOrgEvent
);

router.post(
  '/',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isManager,
  createOrUpdateOrgEventRules(),
  expValidate,
  EventController.createOrgEvent
);

router.put(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  jwtAuth,
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  createOrUpdateOrgEventRules(),
  expValidate,
  EventController.updateOrgEvent
);

router.patch(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  jwtAuth,
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  addOrRemoveEventParticipantRules(),
  expValidate,
  checkEventParticipant,
  EventController.addEventParticipant
);

router.delete(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  jwtAuth,
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  addOrRemoveEventParticipantRules(),
  expValidate,
  checkEventParticipant,
  EventController.removeEventParticipant
);

router.patch(
  '/:event_id/me',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  jwtAuth,
  checkProfile,
  checkOrg,
  isInOrg,
  checkEvent,
  isInEvent,
  updateEventParticipantRules(),
  expValidate,
  EventController.updateMyParticipantStatus
);

router.delete(
  '/:event_id',
  checkObjectId('org_id'),
  checkObjectId('event_id'),
  jwtAuth,
  checkOrg,
  checkEvent,
  isManager,
  managerIsEventCreator,
  EventController.deleteOrgEvent
);

//----- LOCATIONS -----
router.use('/locations', locationRouter);

export default router;
