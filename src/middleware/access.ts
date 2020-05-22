import { OrganizationDocument } from '../models/Organization';
import { EventDocument } from '../models/Event';
import MiddlewareFunction, { IJwtUser } from '../config/middleware';
import routeError from '../utils/error';

export const isAdmin: MiddlewareFunction = (req, res, next) => {
  const user = req.user as IJwtUser;

  const org: OrganizationDocument = res.locals.org;
  if (!user.isAdmin || user.organization !== org._id)
    return res.status(403).json(routeError('Access denied'));
  return next();
};

export const isManager: MiddlewareFunction = (req, res, next) => {
  const user = req.user as IJwtUser;

  const org: OrganizationDocument = res.locals.org;
  if (!user.isManager || user.organization !== org._id)
    return res.status(403).json(routeError('Access denied'));
  return next();
};

export const managerIsEventCreator: MiddlewareFunction = (req, res, next) => {
  const user = req.user as IJwtUser;

  const event: EventDocument = res.locals.event;
  if (!req.header('Override-createdBy') && event.createdBy !== user.id)
    return res
      .status(403)
      .json(routeError('Access Denied: You are not the creator of this event'));
  return next();
};

export const isInOrg: MiddlewareFunction = (req, res, next) => {
  const user = req.user as IJwtUser;

  const org: OrganizationDocument = res.locals.org;
  if (user.organization !== org._id)
    return res.status(403).json(routeError('Access denied'));
  return next();
};

export const isInEvent: MiddlewareFunction = (req, res, next) => {
  const user = req.user as IJwtUser;

  const event: EventDocument = res.locals.event;
  const participant = event.participants.find(el => el.worker === user.id);
  if (!participant) return res.status(400).json(routeError('Access denied'));

  res.locals.participant = participant;
  return next();
};
