import _ from 'lodash';
import Profile from '../models/Profile';
import MiddlewareFn, { IJwtUser } from '../config/middleware';
import routeError from '../utils/error';

export const getAllOrgWorkers: MiddlewareFn = async (_req, res, next) => {
  try {
    const orgUsers = await Profile.find({
      organization: res.locals.org.id
    });

    if (_.isEmpty(orgUsers))
      res.status(404).json(routeError('No users found for this organization'));

    return res.json({ orgUsers });
  } catch (err) {
    return next(err);
  }
};

export const joinPublicOrg: MiddlewareFn = async (req, res, next) => {
  // ensure organization is public
  if (res.locals.org.isPrivate)
    return res
      .status(400)
      .json(
        routeError(
          'Organization is private. Request an invite from an administrator to join.'
        )
      );

  try {
    const reqUser = req.user as IJwtUser;

    // check user profile exists
    const userProfile = await Profile.findOne({
      user: reqUser.id
    });

    if (!userProfile)
      return res
        .status(400)
        .json(
          routeError(
            'User must complete profile before joining an organization'
          )
        );

    // ensure user not already assigned
    if (userProfile.organization)
      return res
        .status(400)
        .json(
          routeError(
            'User already assigned to another organization. Leave organization before joining another.'
          )
        );

    userProfile.isAdmin = false;
    userProfile.isManager = false;
    userProfile.organization = res.locals.org.id;
    await userProfile.save();
    return res.json({ org: userProfile.organization });
  } catch (err) {
    return next(err);
  }
};

export const leaveOrg: MiddlewareFn = async (req, res, next) => {
  try {
    const reqUser = req.user as IJwtUser;

    // ensure org still has another admin
    let anotherAdminExists = false;

    if (res.locals.profile.isAdmin) {
      // exclude current user from query
      const orgUsers = await Profile.find({
        organization: res.locals.org.id,
        user: { $ne: reqUser.id }
      });

      if (_.isEmpty(orgUsers))
        return res
          .status(404)
          .json(
            routeError(
              'No other users found for this organization. Delete this organization to leave.'
            )
          );

      for (let i = 0; i < orgUsers.length; i++) {
        if (orgUsers[i].isAdmin) anotherAdminExists = true;
      }

      if (!anotherAdminExists)
        return res
          .status(400)
          .json(
            routeError(
              'You are the sole admin of this organization. Assign another admin before leaving or delete this organization.'
            )
          );
    }

    // TODO: remove worker as participant from any existing events

    res.locals.profile.organization = null;
    res.locals.profile.isAdmin = false;
    res.locals.profile.isManager = false;
    await res.locals.profile.save();
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};
