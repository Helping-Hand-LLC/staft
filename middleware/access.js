const { routeError } = require('../utils/error');

module.exports = {
  isAdmin: (req, res, next) => {
    if (!req.user.isAdmin || req.user.organization != res.locals.org.id)
      return res.status(403).json(routeError('Access denied'));
    next();
  },
  isManager: (req, res, next) => {
    if (!req.user.isManager || req.user.organization != res.locals.org.id)
      return res.status(403).json(routeError('Access denied'));
    next();
  },
  managerIsEventCreator: (req, res, next) => {
    if (
      !req.header('Override-createdBy') &&
      res.locals.event.createdBy != req.user.id
    )
      return res
        .status(403)
        .json(
          routeError(
            'Warning (Access Denied): You are not the creator of this event'
          )
        );
    next();
  },
  isInOrg: (req, res, next) => {
    if (req.user.organization != res.locals.org.id)
      return res.status(403).json(routeError('Access denied'));
    next();
  },
  isInEvent: (req, res, next) => {
    const participant = res.locals.event.participants.find(
      el => el.worker == req.user.id
    );
    if (!participant) return res.status(400).json(routeError('Access denied'));

    res.locals.participant = participant;
    next();
  }
};
