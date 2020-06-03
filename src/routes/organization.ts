import { Router } from 'express';
import workerRouter from './worker';
import eventRouter from './event';
import { jwtAuth, isAdmin, isInOrg } from '../middleware/access';
import checkObjectId from '../middleware/checkObjectId';
import {
  createOrgRules,
  updateOrgRules,
  addWorkerToOrgRules,
  expValidate
} from '../middleware/validator';
import { checkOrg } from '../middleware/checkModel';
import * as OrgController from '../controllers/organization';

const router = Router();

router.get('/', jwtAuth, OrgController.getAllPublicOrgs);

router.get(
  '/:org_id/me',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isInOrg,
  OrgController.getSingleOrg
);

router.post('/', createOrgRules(), expValidate, OrgController.createOrg);

router.put(
  '/:org_id',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isAdmin,
  updateOrgRules(),
  expValidate,
  OrgController.updateOrg
);

router.patch(
  '/:org_id/addWorker',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isAdmin,
  addWorkerToOrgRules(),
  expValidate,
  OrgController.addWorkerToOrg
);

router.delete(
  '/:org_id',
  checkObjectId('org_id'),
  jwtAuth,
  checkOrg,
  isAdmin,
  OrgController.deleteOrg
);

//----- WORKERS -----
router.use('/:org_id/workers', jwtAuth, workerRouter);

//----- EVENTS -----
router.use('/:org_id/events', eventRouter);

export default router;
