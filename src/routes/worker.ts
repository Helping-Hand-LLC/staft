import { Router } from 'express';
import { isInOrg } from '../middleware/access';
import checkObjectId from '../middleware/checkObjectId';
import { checkOrg, checkProfile } from '../middleware/checkModel';
import * as WorkerController from '../controllers/worker';

const router = Router({ mergeParams: true });

/**
 * GET /organizations/:org_id/users
 *
 * @desc retrieve an organization's users
 * @returns {JSON} this organization's user's public information
 * @access private
 */
router.get(
  '/',
  checkObjectId('org_id'),
  checkOrg,
  isInOrg,
  WorkerController.getAllOrgWorkers
);

/**
 * GET /organizations/:org_id/users/join/me
 *
 * @desc user join public organization
 * @returns {JSON} success indicator
 * @access private
 */
router.get(
  '/join/me',
  checkObjectId('org_id'),
  checkOrg,
  WorkerController.joinPublicOrg
);

/**
 * PATCH /organizations/:org_id/users/leave/me
 *
 * @desc user removes self from organization
 * @returns {JSON} success indicator
 * @access private
 */
router.patch(
  '/leave/me',
  checkObjectId('org_id'),
  checkProfile,
  checkOrg,
  isInOrg,
  WorkerController.leaveOrg
);

export default router;
