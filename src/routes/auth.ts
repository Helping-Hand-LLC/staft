import { Router } from 'express';
import { jwtAuth } from '../middleware/access';
import {
  loginRules,
  registerRules,
  expValidate
} from '../middleware/validator';
import * as AuthController from '../controllers/auth';

const router = Router();

router.post('/login', loginRules(), expValidate, AuthController.login);
router.post('/register', registerRules(), expValidate, AuthController.register);
router.get('/logout', jwtAuth, AuthController.logout);

export default router;
