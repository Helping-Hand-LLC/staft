import express, { Application } from 'express';
import passport from 'passport';
import connectdb from './config/db';
import AuthRouter from './routes/auth';

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

export default app;
