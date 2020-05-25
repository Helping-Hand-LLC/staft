import _ from 'lodash';
import User from '../models/User';
import Profile from '../models/Profile';
import Organization from '../models/Organization';
import Event from '../models/Event';
import MiddlewareFn from '../config/middleware';
import routeError from '../utils/error';

export const getAllPublicOrgs: MiddlewareFn = async (_req, res, next) => {
  try {
    const publicOrgs = await Organization.find({ isPrivate: false }, 'uid');

    if (_.isEmpty(publicOrgs))
      return res.status(404).json(routeError('No public organizations found'));

    return res.json({ publicOrgs });
  } catch (err) {
    return next(err);
  }
};

export const getSingleOrg: MiddlewareFn = (_req, res) =>
  res.json({ org: res.locals.org });

export const createOrg: MiddlewareFn = async (req, res, next) => {
  const { uid, isPrivate } = req.body;

  try {
    // check if org exists
    let org = await Organization.findOne({ uid });

    // org already registered
    if (org)
      return res
        .status(400)
        .json(
          routeError(
            'Choose a different unique identifier for your new organization'
          )
        );

    // create new org
    org = new Organization({ uid, isPrivate });
    await org.save();

    return res.json({ org });
  } catch (err) {
    return next(err);
  }
};

export const updateOrg: MiddlewareFn = async (req, res, next) => {
  const { uid, isPrivate } = req.body;

  try {
    // existing values should be re-sent so we don't need to check for null
    res.locals.org.uid = uid;
    res.locals.org.isPrivate = isPrivate;
    await res.locals.org.save();

    return res.json({ org: res.locals.org });
  } catch (err) {
    return next(err);
  }
};

export const addWorkerToOrg: MiddlewareFn = async (req, res, next) => {
  const { workerEmail, access } = req.body;

  try {
    // check that worker exists
    const worker = await User.findOne({ email: workerEmail });

    if (!worker)
      return res.status(404).json(routeError('Worker does not exist'));

    // check worker profile
    const workerProfile = await Profile.findOne({
      user: worker.id
    });

    if (!workerProfile)
      return res
        .status(400)
        .json(
          routeError(
            'Worker must complete profile before being added to an organization'
          )
        );

    // check worker organization
    if (workerProfile.organization)
      return res
        .status(400)
        .json(
          routeError('Worker is already assigned to a different organization')
        );

    // check that organization is private before adding worker
    if (res.locals.org.isPrivate && access === 'worker')
      return res
        .status(400)
        .json(
          routeError(
            'Workers can join public organizations themselves. Assigning workers is reserved for private organizations only.'
          )
        );

    // set access level
    switch (access) {
      case 'admin':
        workerProfile.isAdmin = true;
        workerProfile.isManager = true;
        break;

      case 'manager':
        workerProfile.isAdmin = false;
        workerProfile.isManager = true;
        break;

      default:
        workerProfile.isAdmin = false;
        workerProfile.isManager = false;
        break;
    }
    workerProfile.organization = res.locals.org.id;
    await workerProfile.save();
    res.json({
      worker: {
        email: workerEmail,
        isAdmin: workerProfile.isAdmin,
        isManager: workerProfile.isManager,
        organization: workerProfile.organization
      }
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteOrg: MiddlewareFn = async (_req, res, next) => {
  try {
    // get orgUsers and remove organization field
    const orgUsers = await Profile.find({
      organization: res.locals.org.id
    });

    if (!_.isEmpty(orgUsers)) {
      for (let i = 0; i < orgUsers.length; i++) {
        orgUsers[i].isAdmin = false;
        orgUsers[i].isManager = false;
        orgUsers[i].organization = null;
        await orgUsers[i].save();
      }
    }

    // delete all org events
    await Event.deleteMany({ organization: res.locals.org.id }).catch(err =>
      next(err)
    );

    // remove org
    await Organization.findOneAndDelete({ _id: res.locals.org.id }).catch(err =>
      next(err)
    );
    res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};
