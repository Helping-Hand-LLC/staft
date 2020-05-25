import { Router } from 'express';
import {
  createOrUpdateProfileRules,
  expValidate
} from '../middleware/validator';
import { checkUser, checkProfile } from '../middleware/checkModel';
import UserController from '../controllers/user';

const router = Router();

router.get('/me', checkUser, UserController.getUser);
router.get('/profile/me', checkProfile, UserController.getUserProfile);
router.post(
  '/profile',
  createOrUpdateProfileRules(),
  expValidate,
  UserController.createOrUpdateProfile
);
router.delete('/profile/me', UserController.deleteUserAndProfile);

export default router;
