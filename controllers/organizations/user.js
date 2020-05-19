const Profile = require('../../models/Profile');
const { routeError } = require('../../utils/error');

module.exports = {
  getOrgUsers: async (req, res, next) => {
    const orgUsers = await Profile.find({
      organization: res.locals.org.id
    }).catch(err => next(err));

    if (!orgUsers.length)
      res.status(404).json(routeError('No users found for this organization'));

    return res.json({ orgUsers });
  },
  joinPublicOrg: async (req, res, next) => {
    // ensure organization is public
    if (res.locals.org.isPrivate)
      return res
        .status(400)
        .json(
          routeError(
            'Organization is private. Request an invite from an administrator to join.'
          )
        );

    const userProfile = await Profile.findOne({
      user: req.user.id
    }).catch(err => next(err));

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
    return res.json({ success: true });
  },
  leaveOrg: async (req, res, next) => {
    // ensure org still has another admin
    let anotherAdminExists = false;

    if (res.locals.profile.isAdmin) {
      // exclude current user from query
      const orgUsers = await Profile.find({
        organization: res.locals.org.id,
        user: { $ne: req.user.id }
      }).catch(err => next(err));

      if (!orgUsers.length)
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

    res.locals.profile.organization = null;
    res.locals.profile.isAdmin = false;
    res.locals.profile.isManager = false;
    await res.locals.profile.save();
    return res.json({ success: true });
  }
};
