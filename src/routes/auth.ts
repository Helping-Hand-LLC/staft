import { Router } from 'express';
import passport from 'passport';
import {
  loginRules,
  registerRules,
  expValidate
} from '../middleware/validator';
import AuthController from '../controllers/auth';

const router = Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/login', loginRules(), expValidate, AuthController.login);
router.post('/register', registerRules(), expValidate, AuthController.register);
router.get('/logout', jwtAuth, AuthController.logout);

export default router;
