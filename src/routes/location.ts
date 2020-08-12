import { Router } from 'express';
import { jwtAuth, isManager } from '../middleware/access';
import checkObjectId from '../middleware/checkObjectId';
import {
  createOrgEventLocationRules,
  queryOrgEventLocationRules,
  expValidate
} from '../middleware/validator';
import { checkOrg } from '../middleware/checkModel';
import * as LocationController from '../controllers/location';

const router = Router({ mergeParams: true });

router.get(
  '/stored',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isManager,
  LocationController.getAllStoredLocations
);

router.post(
  '/query',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isManager,
  queryOrgEventLocationRules(),
  expValidate,
  LocationController.queryGoogleLocations
);

router.post(
  '/',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isManager,
  createOrgEventLocationRules(),
  expValidate,
  LocationController.createLocation
);

export default router;
