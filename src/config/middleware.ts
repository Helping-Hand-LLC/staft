import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export interface IJwtUser extends Request {
  // same fields as decoded AuthToken
  id: mongoose.Schema.Types.ObjectId;
  isAdmin: boolean;
  isManager: boolean;
  organization: mongoose.Schema.Types.ObjectId | null;
  expiresIn: string;
}

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => void;

export default MiddlewareFn;
