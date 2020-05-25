import _ from 'lodash';
import mongoose from 'mongoose';
import moment from 'moment';
import Event from '../models/Event';
import MiddlewareFn, { IJwtUser } from '../config/middleware';
import routeError from '../utils/error';

export const getAllOrgEvents: MiddlewareFn = async (_req, res, next) => {
  try {
    const orgEvents = await Event.find({
      organization: res.locals.org.id
    });

    res.json({ orgEvents });
  } catch (err) {
    return next(err);
  }
};

export const getSingleOrgEvent: MiddlewareFn = async (_req, res) =>
  res.json({ event: res.locals.event });

export const getAllMyOrgEvents: MiddlewareFn = async (req, res, next) => {
  try {
    const reqUser = req.user as IJwtUser;
    const orgEvents = await Event.find({
      organization: res.locals.org.id
    });

    if (_.isEmpty(orgEvents))
      return res
        .status(404)
        .json(routeError('No events found for this organization'));

    // filter to this user as participant
    const myOrgEvents = [];

    for (let i = 0; i < orgEvents.length; i++) {
      const event = orgEvents[i];
      const participant = event.participants.find(
        el => el.worker === reqUser.id
      );
      if (participant) myOrgEvents.push(event);
    }

    res.json({ myOrgEvents });
  } catch (err) {
    return next(err);
  }
};

export const getMySingleOrgEvent: MiddlewareFn = (_req, res) =>
  res.json({ event: res.locals.event });

export const createOrgEvent: MiddlewareFn = async (req, res, next) => {
  try {
    const reqUser = req.user as IJwtUser;
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
      createdBy: reqUser.id,
      startDateTime,
      endDateTime,
      isRepeatEvent,
      repeatOptions,
      links
    });
    await event.save();
    res.json({ event });
  } catch (err) {
    return next(err);
  }
};

export const updateOrgEvent: MiddlewareFn = async (req, res, next) => {
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
      .json(routeError('You cannot modify an event that has already started'));
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

  try {
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
  } catch (err) {
    return next(err);
  }
};

export const addEventParticipant: MiddlewareFn = async (req, res, next) => {
  const { worker } = req.body;

  if (res.locals.participant)
    return res
      .status(400)
      .json(routeError('Worker already assigned to this event'));

  try {
    res.locals.event.participants.push({ worker });
    await res.locals.event.save();
    res.json({ participants: res.locals.event.participants });
  } catch (err) {
    return next(err);
  }
};

export const removeEventParticipant: MiddlewareFn = async (req, res, next) => {
  if (!res.locals.participant)
    return res
      .status(400)
      .json(routeError('Worker is not assigned to this event'));

  // warn about removing participant who have accepted confirmation
  let violaton = false;
  if (res.locals.participant.confirmedStatus === 'accepted') violaton = true;

  if (!req.header('Override-Confirmed-Participants') && violaton)
    return res
      .status(400)
      .json(
        routeError(
          'Warning: Are you sure you wish to remove a participant who is confirmed for this event?'
        )
      );

  try {
    res.locals.event.participants.id(res.locals.participant._id).remove();
    await res.locals.event.save();
    res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

export const updateMyParticipantStatus: MiddlewareFn = async (
  req,
  res,
  next
) => {
  const { confirmedStatus, checkedIn, checkedOut } = req.body;

  try {
    res.locals.participant.confirmedStatus = confirmedStatus;
    res.locals.participant.checkedIn = checkedIn;
    res.locals.participant.checkedOut = checkedOut;
    await res.locals.event.save();
    res.json({ participant: res.locals.participant });
  } catch (err) {
    next(err);
  }
};

export const deleteOrgEvent: MiddlewareFn = async (_req, res, next) => {
  try {
    await Event.findOneAndDelete({ _id: res.locals.event.id });
    res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};
