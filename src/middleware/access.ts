import passport from 'passport';
import { IOrg } from '../models/Organization';
import { IEvent } from '../models/Event';
import MiddlewareFn, { IJwtUser } from '../config/middleware';
import routeError from '../utils/error';

export const jwtAuth = passport.authenticate('jwt', { session: false });

export const isAdmin: MiddlewareFn = (req, res, next) => {
  const user = req.user as IJwtUser;

  const org: IOrg = res.locals.org;
  if (!user.isAdmin || user.organization != org._id)
    return res.status(403).json(routeError('Access denied'));
  return next();
};

export const isManager: MiddlewareFn = (req, res, next) => {
  const user = req.user as IJwtUser;

  const org: IOrg = res.locals.org;
  if (!user.isManager || user.organization != org._id)
    return res.status(403).json(routeError('Access denied'));
  return next();
};

export const managerIsEventCreator: MiddlewareFn = (req, res, next) => {
  const user = req.user as IJwtUser;

  const event: IEvent = res.locals.event;
  if (!req.header('Override-createdBy') && event.createdBy != user.id)
    return res
      .status(403)
      .json(routeError('Access Denied: You are not the creator of this event'));
  return next();
};

export const isInOrg: MiddlewareFn = (req, res, next) => {
  const user = req.user as IJwtUser;

  const org: IOrg = res.locals.org;
  if (user.organization != org._id)
    return res.status(403).json(routeError('Access denied'));
  return next();
};

export const isInEvent: MiddlewareFn = (req, res, next) => {
  const user = req.user as IJwtUser;

  const event: IEvent = res.locals.event;
  const participant = event.participants.find(el => el.worker == user.id);
  if (!participant) return res.status(400).json(routeError('Access denied'));

  res.locals.participant = participant;
  return next();
};
