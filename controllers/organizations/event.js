const Event = require('../../models/Event');
const { checkConfirmedParticipant } = require('../../utils/helpers');
const { routeError } = require('../../utils/error');

module.exports = {
  getOrgEvents: () => {
    /* TODO: implement me */
  },
  getOrgEvent: () => {
    /* TODO: implement me */
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
      participants,
      links
    } = req.body;

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
      participants,
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
      participants,
      links
    } = req.body;

    // TODO: check modification after startDateTime of event
    // if (Date.now() >= startDateTime && Date.now() <= endDateTime)
    //   return res
    //     .status(400)
    //     .json(
    //       routeError('You cannot modify an event that has already started')
    //     );
    // // TODO: check modification after endDateTime of event
    // if (Date.now() > endDateTime)
    //   return res
    //     .status(400)
    //     .json(routeError('You cannot modify an event that has already ended'));

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
    // warn about removing participants who have accepted confirmation
    let violaton = false;
    for (let i = 0; i < res.locals.event.participants.length; i++) {
      // loop over original participants
      // if any have accepted confirmation, check if they are still in the modified participants that were sent in req.body
      // if not, set violation

      if (
        res.locals.event.participants[i].confirmedStatus === 'accepted' &&
        !checkConfirmedParticipant(
          res.locals.event.participants[i].worker,
          participants
        )
      )
        violaton = true;
    }

    if (!req.header('Override-Confirmed-Participants') && violaton)
      return res
        .status(400)
        .json(
          routeError(
            'Warning: Are you sure you wish to remove participants who are confirmed for this event?'
          )
        );

    res.locals.event.isPublished = isPublished;
    res.locals.event.title = title;
    res.locals.event.location = location;
    res.locals.event.startDateTime = startDateTime;
    res.locals.event.endDateTime = endDateTime;
    res.locals.event.isRepeatEvent = isRepeatEvent;
    res.locals.event.repeatOptions = repeatOptions;
    res.locals.event.participants = participants;
    res.locals.event.links = links;
    await res.locals.event.save();
    res.json({ event: res.locals.event });
  },
  updateOrgEventParticipant: () => {
    /* TODO: implement me */
  },
  deleteOrgEvent: () => {
    /* TODO: implement me */
  }
};
