const User = require('../models/User');
const Profile = require('../models/Profile');

module.exports = {
  getUser: (req, res) => res.json({ user: res.locals.user }),
  getUserProfile: async (req, res) => {
    const result = res.locals.profile.populate('user', ['type']);
    return res.json({ result });
  },
  createOrUpdateProfile: async (req, res, next) => {
    let { organization } = req.body;
    const { name, address, phone, birthday, gender, ssn } = req.body;

    // set organization to null if not submitted
    if (!organization) {
      organization = null;
    }

    // Using upsert option (creates new doc if no match is found)
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          user: req.user.id,
          organization,
          name,
          address,
          phone,
          birthday,
          gender,
          ssn
        }
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    ).catch(err => next(err));
    return res.json({ profile });
  },
  deleteUserAndProfile: async (req, res, next) => {
    // remove user profile
    await Profile.findOneAndDelete({ user: req.user.id }).catch(err =>
      next(err)
    );
    // remove user
    await User.findOneAndDelete({ _id: req.user.id }).catch(err => next(err));

    return res.json({ success: true });
  }
};
