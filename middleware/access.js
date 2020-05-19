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
  }
};
