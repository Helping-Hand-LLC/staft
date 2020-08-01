import User from '../models/User';
import Profile from '../models/Profile';
import Organization, { IOrg } from '../models/Organization';
import Event, { IEvent } from '../models/Event';
import MiddlewareFn, { IJwtUser } from '../config/middleware';
import routeError from '../utils/error';

export const checkUser: MiddlewareFn = async (req, res, next) => {
  const reqUser = req.user as IJwtUser;

  try {
    const user = await User.findById(reqUser.id, '-password');

    if (!user) return res.status(404).json(routeError('User does not exist'));

    res.locals.user = user;
    return next();
  } catch (err) {
    next(err);
  }
};
export const checkProfile: MiddlewareFn = async (req, res, next) => {
  const reqUser = req.user as IJwtUser;

  try {
    const profile = await Profile.findOne({ user: reqUser.id })
      .populate('user', ['type', 'email'])
      .populate('organization', 'uid');

    if (!profile)
      return res
        .status(404)
        .json(routeError('Profile could not be found for this user'));

    res.locals.profile = profile;
    return next();
  } catch (err) {
    next(err);
  }
};
export const checkOrg: MiddlewareFn = async (req, res, next) => {
  try {
    const org = await Organization.findById(req.params.org_id);

    if (!org)
      return res.status(404).json(routeError('Organization does not exist'));

    res.locals.org = org;
    return next();
  } catch (err) {
    next(err);
  }
};
export const checkEvent: MiddlewareFn = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.event_id)
      .populate('organization', 'uid')
      .populate('location', '-organization')
      .populate('createdBy', 'email')
      .populate({
        path: 'participants',
        populate: {
          path: 'worker',
          select: 'email'
        }
      });

    if (!event) return res.status(404).json(routeError('Event does not exist'));

    res.locals.event = event;
    return next();
  } catch (err) {
    next(err);
  }
};
export const checkEventParticipant: MiddlewareFn = async (req, res, next) => {
  const { worker } = req.body;

  try {
    // check worker exists
    const existingWorker = await User.findById(worker);

    if (!existingWorker)
      return res.status(404).json(routeError('Worker does not exist'));

    // check worker has completed profile
    const workerProfile = await Profile.findOne({ user: worker });

    if (!workerProfile)
      return res
        .status(400)
        .json(
          routeError(
            'Worker must complete profile before being assigned/removed from an event'
          )
        );

    // check worker belongs to this organization
    const org: IOrg = res.locals.org;
    if (String(workerProfile.organization) != String(org._id))
      return res
        .status(400)
        .json(routeError('Worker does not belong to this organization'));

    // check if worker belongs to this event
    const event: IEvent = res.locals.event;
    const participant = event.participants.find(el => el.worker == worker);

    // set variables for controllers
    res.locals.worker = existingWorker;
    res.locals.participant = participant;
    return next();
  } catch (err) {
    next(err);
  }
};
