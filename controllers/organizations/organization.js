const _ = require('lodash');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Organization = require('../../models/Organization');
const Event = require('../../models/Event');
const { routeError } = require('../../utils/error');

module.exports = {
  getPublicOrgs: async (req, res, next) => {
    const publicOrgs = await Organization.find({ isPrivate: false })
      .select('uid')
      .catch(err => next(err));

    if (_.isEmpty(publicOrgs))
      res.status(404).json(routeError('No public organizations found'));

    return res.json({ publicOrgs });
  },
  getOrg: (req, res) => res.json({ org: res.locals.org }),
  createOrg: async (req, res, next) => {
    const { uid, isPrivate } = req.body;

    // check if org exists
    let org = await Organization.findOne({ uid }).catch(err => next(err));

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
  },
  updateOrg: async (req, res) => {
    const { uid, isPrivate } = req.body;

    // existing values should be re-sent so we don't need to check for null
    res.locals.org.uid = uid;
    res.locals.org.isPrivate = isPrivate;
    await res.locals.org.save();

    return res.json({ org: res.locals.org });
  },
  addWorker: async (req, res, next) => {
    const { workerEmail, access } = req.body;

    // check that worker exists
    const worker = User.findOne({ email: workerEmail }).catch(err => next(err));

    if (!worker)
      return res.status(404).json(routeError('Worker does not exist'));

    // check worker profile
    const workerProfile = Profile.findOne({ user: worker.id }).catch(err =>
      next(err)
    );

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
  },
  deleteOrg: async (req, res, next) => {
    // get orgUsers and remove organization field
    const orgUsers = await Profile.find({
      organization: res.locals.org.id
    }).catch(err => next(err));

    if (!_.isEmpty(orgUsers)) {
      for (let i = 0; i < orgUsers.length; i++) {
        orgUsers[i].isAdmin = false;
        orgUsers[i].isManager = false;
        orgUsers[i].organization = null;
        await orgUsers[i].save();
      }
    }

    // delete all org events
    Event.deleteMany({ organization: res.locals.org.id }).catch(err =>
      next(err)
    );

    // remove org
    await Organization.findOneAndDelete({ _id: res.locals.org.id }).catch(err =>
      next(err)
    );
    res.json({ success: true });
  }
};
