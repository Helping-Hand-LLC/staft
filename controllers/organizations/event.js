const Event = require('../../models/Event');

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

    // TODO: client side warnings:
    // warn about modification of published event
    // check createdBy before modification
    // warn about removing participants who have accepted confirmation

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
