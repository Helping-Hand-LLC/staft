// const User = require('../models/User');
// const Profile = require('../models/Profile');
// const Organization = require('../models/Organization');

module.exports = {
  getOrg: (req, res) => res.json({ org: res.locals.org })
};
