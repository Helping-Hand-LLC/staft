const mongoose = require('mongoose');
const { routeError } = require('../utils/error');

const checkObjectId = idToCheck => (req, res, next) => {
  // idToCheck: String representing the request parameter to check
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json(routeError('Invalid ObjectId'));
  next();
};

module.exports = checkObjectId;
