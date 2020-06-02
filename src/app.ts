import express, { Application } from 'express';
import passport from 'passport';
import connectdb from './config/db';

import { jwtAuth } from './middleware/access';
import AuthRouter from './routes/auth';
import UserRouter from './routes/user';
import OrgRouter from './routes/organization';

const app: Application = express();

// connect mongodb
connectdb();

// passport config
import './middleware/passport';

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initialize passport
app.use(passport.initialize());

// routes
app.use('/auth', AuthRouter);
app.use('/user', jwtAuth, UserRouter);
app.use('/org', OrgRouter);

export default app;
