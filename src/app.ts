import express, { Application } from 'express';
import passport from 'passport';
import connectdb from './config/db';
import path from 'path';
import { nodeEnv } from './config/keys';

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

// serve static assets in production
if (nodeEnv === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  // serve index.html
  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

export default app;
