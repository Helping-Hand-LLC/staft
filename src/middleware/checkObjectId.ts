import mongoose from 'mongoose';
import routeError from '../utils/error';
import MiddlewareFn from '../config/middleware';

type checkObjectIdFn = (idToCheck: string) => MiddlewareFn;

const checkObjectId: checkObjectIdFn = idToCheck => (req, res, next) => {
  // idToCheck: String representing the request parameter to check
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json(routeError('Invalid ObjectId'));
  return next();
};

export default checkObjectId;
