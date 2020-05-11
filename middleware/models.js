// const User = require('../models/User');
// const Profile = require('../models/Profile');
const Organization = require('../models/Organization');

module.exports = {
  checkUser: () => {},
  checkProfile: () => {},
  checkOrg: async (req, res, next) => {
    const org = await Organization.findById(req.params.org_id).catch(err =>
      next(err)
    );

    if (!org)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Organization does not exist' }] });

    res.locals.org = org;
    next();
  }
};
