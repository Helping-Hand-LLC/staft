import express, { Application, Request, Response } from 'express';
import connectdb from './config/db';

const app: Application = express();

// connect mongodb
connectdb();

// routes
app.get('/', (_req: Request, res: Response) => res.send('hello world'));

export default app;
