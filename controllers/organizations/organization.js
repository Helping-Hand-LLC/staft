const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Organization = require('../../models/Organization');
const Event = require('../../models/Event');
const { routeError } = require('../../utils/error');

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

    if (!publicOrgs.length)
      res.status(404).json(routeError('No public organizations found'));

    return res.json({ publicOrgs });
  },
  updateOrg: async (req, res, next) => {
    const {
      uid,
      isPrivate,
      adminEmails,
      managerEmails,
      workerEmails
    } = req.body;

    // ensure private org before setting workerEmails
    if (!isPrivate && workerEmails.length > 0)
      res
        .status(400)
        .json(
          routeError(
            'Workers can join public organizations themselves. Assigning workers is reserved for private organizations only.'
          )
        );

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

    // validate managers
    for (let i = 0; i < managerEmails.length; i++) {
      const manager = managerEmails[i];
      const result = await User.findOne({ email: manager }).catch(err =>
        next(err)
      );
      // ensure manager is already a registered user
      if (!result)
        return res
          .status(400)
          .json(
            routeError(
              'Please register all manager emails before assigning to an organization'
            )
          );

      // ensure manager has completed their profile
      const managerProfile = await Profile.findOne({
        user: result.id
      }).catch(err => next(err));
      if (!managerProfile)
        return res
          .status(400)
          .json(
            routeError(
              'All managers must complete their profile before being assigned to an organization'
            )
          );

      // ensure manager is not already assigned to another organization
      if (
        managerProfile.isManager &&
        managerProfile.organization != req.params.org_id
      )
        return res
          .status(400)
          .json(
            routeError(
              'Managers cannot be already assigned to another organization'
            )
          );

      // add isManager and organization to manager
      managerProfile.isManager = true;
      managerProfile.organization = res.locals.org.id;
      await managerProfile.save();
    }

    if (workerEmails.length > 0) {
      // validate workerEmails
      for (let i = 0; i < workerEmails.length; i++) {
        const worker = workerEmails[i];
        const result = await User.findOne({ email: worker }).catch(err =>
          next(err)
        );
        // ensure worker is already a registered user
        if (!result)
          return res
            .status(400)
            .json(
              routeError(
                'Please register all worker emails before assigning to an organization'
              )
            );

        // ensure worker has completed their profile
        const workerProfile = await Profile.findOne({
          user: result.id
        }).catch(err => next(err));
        if (!workerProfile)
          return res
            .status(400)
            .json(
              routeError(
                'All workers must complete their profile before being assigned to an organization'
              )
            );

        // ensure worker is not already assigned to another organization
        if (workerProfile.organization != req.params.org_id)
          return res
            .status(400)
            .json(
              routeError(
                'Workers cannot be already assigned to another organization'
              )
            );

        // add organization to worker
        workerProfile.organization = res.locals.org.id;
        await workerProfile.save();
      }
    }

    // existing values should be re-sent so we don't need to check for null
    res.locals.org.uid = uid;
    res.locals.org.isPrivate = isPrivate;
    await res.locals.org.save();

    return res.json({ org: res.locals.org });
  },
  deleteOrg: async (req, res, next) => {
    // get orgUsers and remove organization field
    const orgUsers = await Profile.find({
      organization: res.locals.org.id
    }).catch(err => next(err));

    if (orgUsers.length > 0) {
      for (let i = 0; i < orgUsers.length; i++) {
        orgUsers[i].isAdmin = false;
        orgUsers[i].isManager = false;
        orgUsers[i].organization = null;
        await orgUsers[i].save();
      }
    }

    // delete all org events
    Event.deleteMany({ organization: res.locals.org.id }).catch(err =>
      next(err)
    );

    // remove org
    await Organization.findOneAndDelete({ _id: res.locals.org.id }).catch(err =>
      next(err)
    );
    res.json({ success: true });
  }
};
