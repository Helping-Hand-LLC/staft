import User from '../models/User';
import Profile from '../models/Profile';
import MiddlewareFn, { IJwtUser } from '../config/middleware';

const getUser: MiddlewareFn = (_req, res) =>
  res.json({ user: res.locals.user });

const getUserProfile: MiddlewareFn = (_req, res) => {
  const populated = res.locals.profile.populate('user', ['type', 'email']);
  return res.json({ populated });
};

const createOrUpdateProfile: MiddlewareFn = async (req, res, next) => {
  let { organization } = req.body;
  const { name, address, phone, birthday, gender, ssn } = req.body;

  // set organization to null if not submitted
  if (!organization) organization = null;

  try {
    const reqUser = req.user as IJwtUser;

    // Using upsert option (creates new doc if no match is found)
    const profile = await Profile.findOneAndUpdate(
      { user: reqUser.id },
      {
        $set: {
          user: reqUser.id,
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
    );
    return res.json({ profile });
  } catch (err) {
    return next(err);
  }
};

const deleteUserAndProfile: MiddlewareFn = async (req, res, next) => {
  const reqUser = req.user as IJwtUser;

  try {
    // remove user profile
    await Profile.findOneAndDelete({ user: reqUser.id });
    // remove user
    await User.findOneAndDelete({ _id: reqUser.id });

    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

export default {
  getUser,
  getUserProfile,
  createOrUpdateProfile,
  deleteUserAndProfile
};
