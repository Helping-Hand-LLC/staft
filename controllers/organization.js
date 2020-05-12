const User = require('../models/User');
const Profile = require('../models/Profile');
const Organization = require('../models/Organization');
const { routeError } = require('../utils/error');

module.exports = {
  getOrg: (req, res) => res.json({ org: res.locals.org }),
  createOrg: async (req, res, next) => {
    const { uid, isPrivate, adminEmail } = req.body;

    // check if org exists
    let org = await Organization.findOne({ uid }).catch(err => next(err));

    // org already registered
    if (org)
      return res
        .status(400)
        .json(
          routeError(
            'Choose a different unique identifier for your new organization'
          )
        );

    // validate admin
    const admin = await User.findOne({ email: adminEmail }).catch(err =>
      next(err)
    );

    // have user create admin user first
    if (!admin)
      return res
        .status(400)
        .json(
          routeError('Create an admin user before creating a new organization')
        );

    // ensure admin has completed their profile
    const adminProfile = await Profile.findOne({ user: admin.id });

    if (!adminProfile)
      return res
        .status(400)
        .json(
          routeError(
            'Admin must complete their profile before creating a new organization'
          )
        );

    // ensure admin has not already been assigned to another organization
    if (adminProfile.isAdmin && adminProfile.organization)
      return res
        .status(400)
        .json(
          routeError('Admin has already been assigned to another organization')
        );

    // create new org
    org = new Organization({ uid, isPrivate });
    await org.save();

    // set isAdmin and organization of admin user profile
    adminProfile.isAdmin = true;
    adminProfile.organization = org.id;
    await adminProfile.save();

    return res.json({ org });
  },
  getPublicOrgs: async (req, res, next) => {
    const publicOrgs = await Organization.find({ isPrivate: false })
      .select('uid')
      .catch(err => next(err));

    if (!publicOrgs)
      return res.status(404).json(routeError('No public organizations'));

    return res.json({ publicOrgs });
  },
  updateOrg: async (req, res, next) => {
    const {
      uid,
      isPrivate,
      adminEmails
      // managerEmails,
      // clientEmails
    } = req.body;

    // validate admins
    for (let i = 0; i < adminEmails.length; i++) {
      const admin = adminEmails[i];
      const result = await User.findOne({ email: admin }).catch(err =>
        next(err)
      );
      // ensure admin is already a registered user
      if (!result)
        return res
          .status(400)
          .json(
            routeError(
              'Please register all admin emails before assigning to an organization'
            )
          );

      // ensure admin has completed their profile
      const adminProfile = await Profile.findOne({
        user: result.id
      }).catch(err => next(err));
      if (!adminProfile)
        return res
          .status(400)
          .json(
            routeError(
              'All admins must complete their profile before being assigned to an organization'
            )
          );

      // ensure admin is not already assigned to another organization
      if (
        adminProfile.isAdmin &&
        adminProfile.organization != req.params.org_id
      )
        return res
          .status(400)
          .json(
            routeError(
              'Admins cannot be already assigned to another organization'
            )
          );

      // add isAdmin and organization to admin
      adminProfile.isAdmin = true;
      adminProfile.organization = res.locals.org.id;
      await adminProfile.save();
    }

    // existing values should be re-sent so we don't need to check for null
    res.locals.org.uid = uid;
    res.locals.org.isPrivate = isPrivate;
    await res.locals.org.save();

    return res.json({ org: res.locals.org });
  },
  deleteOrg: async () => {
    /* TODO: implement me */
  },
  getOrgUsers: async (req, res, next) => {
    const orgUsers = await Profile.find({
      organization: res.locals.org.id
    }).catch(err => next(err));

    if (!orgUsers)
      return res
        .status(404)
        .json(routeError('No users found for this organization'));

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

      if (!orgUsers)
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
  },
  // FIXME: admins & manager access
  getOrgEvents: () => {
    /* TODO: implement me */
  },
  createOrgEvent: () => {
    /* TODO: implement me */
  },
  updateOrgEvent: () => {
    /* TODO: implement me */
  },
  deleteOrgEvent: () => {
    /* TODO: implement me */
  }
};
