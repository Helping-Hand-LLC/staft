const User = require('../models/User');
const Profile = require('../models/Profile');
const Organization = require('../models/Organization');
const Event = require('../models/Event');
const { routeError } = require('../utils/error');

module.exports = {
  checkUser: async (req, res, next) => {
    const user = await User.findById(req.user.id)
      .select('-password')
      .catch(err => next(err));

    if (!user) return res.status(404).json(routeError('User does not exist'));

    res.locals.user = user;
    next();
  },
  checkProfile: async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).catch(err =>
      next(err)
    );

    if (!profile)
      return res
        .status(404)
        .json(routeError('Profile could not be found for this user'));

    res.locals.profile = profile;
    next();
  },
  checkOrg: async (req, res, next) => {
    const org = await Organization.findById(req.params.org_id).catch(err =>
      next(err)
    );

    if (!org)
      return res.status(404).json(routeError('Organization does not exist'));

    res.locals.org = org;
    next();
  },
  checkEvent: async (req, res, next) => {
    const event = await Event.findById(req.params.event_id).catch(err =>
      next(err)
    );

    if (!event) return res.status(404).json(routeError('Event does not exist'));

    res.locals.event = event;
    next();
  },
  checkEventParticipant: async (req, res, next) => {
    const { worker } = req.body;

    // check worker exists
    const existingWorker = await User.findById(worker).catch(err => next(err));

    if (!existingWorker)
      return res.status(404).json(routeError('Worker does not exist'));

    // check worker has completed profile
    const workerProfile = await Profile.findOne({ user: worker }).catch(err =>
      next(err)
    );

    if (!workerProfile)
      return res
        .status(400)
        .json(
          routeError(
            'Worker must complete profile before being assigned/removed from an event'
          )
        );

    // check worker belongs to this organization
    if (workerProfile.organization != res.locals.org.id) {
      return res
        .status(400)
        .json(routeError('Worker does not belong to this organization'));
    }

    // check if worker belongs to this event
    const participant = res.locals.event.participants.find(
      el => el.worker == worker
    );

    // set variables for controllers
    res.locals.worker = existingWorker;
    res.locals.participant = participant;
    next();
  }
};
