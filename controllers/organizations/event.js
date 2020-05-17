const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Event = require('../../models/Event');
const { routeError } = require('../../utils/error');

module.exports = {
  getOrgEvents: async (req, res, next) => {
    const orgEvents = await Event.find({
      organization: res.locals.org.id
    }).catch(err => next(err));

    res.json({ orgEvents });
  },
  getOrgEvent: async (req, res) => {
    res.json({ event: res.locals.event });
  },
  createOrgEvent: async (req, res) => {
    const {
      isPublished,
      title,
      location,
      startDateTime,
      endDateTime,
      isRepeatEvent,
      repeatOptions,
      links
    } = req.body;

    // check location for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(location))
      return res.status(400).json(routeError('Invalid ObjectId'));

    // create new event
    const event = new Event({
      organization: res.locals.org.id,
      isPublished,
      title,
      location,
      createdBy: req.user.id,
      startDateTime,
      endDateTime,
      isRepeatEvent,
      repeatOptions,
      links
    });
    await event.save();
    res.json({ event });
  },
  updateOrgEvent: async (req, res) => {
    const {
      isPublished,
      title,
      location,
      startDateTime,
      endDateTime,
      isRepeatEvent,
      repeatOptions,
      links
    } = req.body;

    // check location for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(location))
      return res.status(400).json(routeError('Invalid ObjectId'));

    // check modification after startDateTime of event
    if (
      moment().isSameOrAfter(startDateTime) &&
      moment().isSameOrBefore(endDateTime)
    )
      return res
        .status(400)
        .json(
          routeError('You cannot modify an event that has already started')
        );
    // check modification after endDateTime of event
    if (moment().isAfter(endDateTime))
      return res
        .status(400)
        .json(routeError('You cannot modify an event that has already ended'));

    // warn about modification of published event
    if (!req.header('Override-isPublished') && res.locals.event.isPublished)
      return res
        .status(400)
        .json(routeError('Warning: You are modifying a published event'));

    // check createdBy before modification
    if (
      !req.header('Override-createdBy') &&
      res.locals.event.createdBy !== req.user.id
    )
      return res
        .status(401)
        .json(
          routeError(
            'Warning (Unauthorized): You are not the creator of this event and therefore cannot modify it'
          )
        );

    res.locals.event.isPublished = isPublished;
    res.locals.event.title = title;
    res.locals.event.location = location;
    res.locals.event.startDateTime = startDateTime;
    res.locals.event.endDateTime = endDateTime;
    res.locals.event.isRepeatEvent = isRepeatEvent;
    res.locals.event.repeatOptions = repeatOptions;
    res.locals.event.links = links;
    await res.locals.event.save();
    res.json({ event: res.locals.event });
  },
  addEventParticipant: async (req, res, next) => {
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
            'Worker must complete profile before being assigned to an event'
          )
        );

    // check worker belongs to this organization
    if (workerProfile.organization != res.locals.org.id) {
      console.log(workerProfile.organization, res.locals.org.id);
      return res
        .status(400)
        .json(routeError('Worker does not belong to this organization'));
    }

    // check if worker already belongs to this event
    const participant = res.locals.event.participants.find(
      el => el.worker == worker
    );

    if (participant)
      return res
        .status(400)
        .json(routeError('Worker already assigned to this event'));

    res.locals.event.participants.push({ worker });
    await res.locals.event.save();
    res.json({ participants: res.locals.event.participants });
  },
  removeEventParticipant: async (req, res, next) => {
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
            'Worker must complete profile before being assigned to an event'
          )
        );

    // check worker belongs to this organization
    if (workerProfile.organization != res.locals.org.id)
      return res
        .status(400)
        .json(routeError('Worker does not belong to this organization'));

    // check that the sent worker is participant of this event
    const participant = res.locals.event.participants.find(
      el => el.worker == worker
    );

    if (!participant)
      return res
        .status(400)
        .json(routeError('Worker is not assigned to this event'));

    // warn about removing participant who have accepted confirmation
    let violaton = false;
    if (participant.confirmedStatus === 'accepted') violaton = true;

    if (!req.header('Override-Confirmed-Participants') && violaton)
      return res
        .status(400)
        .json(
          routeError(
            'Warning: Are you sure you wish to remove a participant who is confirmed for this event?'
          )
        );

    res.locals.event.participants.id(participant._id).remove();
    await res.locals.event.save();
    res.json({ success: true });
  },
  updateOrgEventParticipant: async (req, res) => {
    // FIXME:
    const { confirmedStatus, checkedIn, checkedOut } = req.body;

    // find participant object of this user on this event
    let pIndex;
    for (let i = 0; i < res.locals.event.participants.length; i++) {
      if (res.locals.event.participants[i].worker == req.user.id) {
        pIndex = i;
        break;
      }
    }

    if (pIndex === undefined)
      return res
        .status(400)
        .json(routeError('You are not a participant of this event'));

    const updatedParticipant = {
      worker: req.user.id,
      confirmedStatus,
      checkedIn,
      checkedOut
    };
    res.locals.event.participants.set(pIndex, updatedParticipant);
    await res.locals.event.save();
    res.json({ participant: updatedParticipant });
  },
  deleteOrgEvent: async (req, res, next) => {
    await Event.findOneAndDelete({ _id: res.locals.event.id }).catch(err =>
      next(err)
    );
    res.json({ success: true });
  }
};
