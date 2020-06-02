/* eslint-disable no-undef */
const {
  buildUser,
  buildReq,
  buildRes,
  buildNext
} = require('./utils/generate');
const {
  isAdmin,
  isManager,
  managerIsEventCreator,
  isInOrg,
  isInEvent
} = require('../middleware/access');
const { routeError } = require('../utils/error');

// isAdmin
describe('Test isAdmin access middleware', () => {
  it('Workers who are not admins are denined access', () => {
    const req = buildReq();
    const res = buildRes();
    const next = buildNext();

    isAdmin(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are not in this organization are denied access', () => {
    const req = buildReq({
      user: buildUser({ isAdmin: true, org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '4321' }
      }
    });
    const next = buildNext();

    isAdmin(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Worker who are neither in this organization or an admin are denied access', () => {
    const req = buildReq({
      user: buildUser({ isAdmin: false, org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '4321' }
      }
    });
    const next = buildNext();

    isAdmin(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are admins and in this organization are allowed access', () => {
    const req = buildReq({
      user: buildUser({ isAdmin: true, org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '1234' }
      }
    });
    const next = buildNext();

    isAdmin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

// isManager
describe('Test isManager access middleware', () => {
  it('Workers who are not managers are denied access', () => {
    const req = buildReq();
    const res = buildRes({ locals: {} });
    const next = buildNext();

    isManager(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are not in this organization are denied access', () => {
    const req = buildReq({
      user: buildUser({ isManager: true, org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '4321' }
      }
    });
    const next = buildNext();

    isManager(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are neither in this organization or a manager are denied access', () => {
    const req = buildReq({
      user: buildUser({ isManager: false, org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '4321' }
      }
    });
    const next = buildNext();

    isManager(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are managers and in this organization are allowed access', () => {
    const req = buildReq({
      user: buildUser({ isManager: true, org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '1234' }
      }
    });
    const next = buildNext();

    isManager(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

// managerIsEventCreator
describe('Test managerIsEventCreator access middleware', () => {
  it('Managers who are not the creator of an event and have not set the override header are denied access', () => {
    const req = buildReq({
      user: buildUser({ id: '1234' }),
      header: function () {
        return this.headers['Override-createdBy'];
      },
      headers: {}
    });
    const res = buildRes({
      locals: {
        event: { createdBy: '4321' }
      }
    });
    const next = buildNext();

    managerIsEventCreator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      routeError(
        'Warning (Access Denied): You are not the creator of this event'
      )
    );
  });

  it('Managers who are not the creator of an event and have set the override header are allowed access', () => {
    const req = buildReq({
      user: buildUser({ id: '1234' }),
      header: function () {
        return this.headers['Override-createdBy'];
      },
      headers: {
        'Override-createdBy': true
      }
    });
    const res = buildRes({
      locals: {
        event: { createdBy: '4321' }
      }
    });
    const next = buildNext();

    managerIsEventCreator(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('Managers who are the creator of an event and have set the override header are allowed access', () => {
    const req = buildReq({
      user: buildUser({ id: '1234' }),
      header: function () {
        return this.headers['Override-createdBy'];
      },
      headers: {
        'Override-createdBy': true
      }
    });
    const res = buildRes({
      locals: {
        event: { createdBy: '1234' }
      }
    });
    const next = buildNext();

    managerIsEventCreator(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('Managers who are the creator of an event are allowed access', () => {
    const req = buildReq({
      user: buildUser({ id: '1234' }),
      header: function () {
        return this.headers['Override-createdBy'];
      },
      headers: {}
    });
    const res = buildRes({
      locals: {
        event: { createdBy: '1234' }
      }
    });
    const next = buildNext();

    managerIsEventCreator(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

// isInOrg
describe('Test isInOrg access middleware', () => {
  it('Workers who are not in this organization are denied access', () => {
    const req = buildReq({
      user: buildUser({ org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '4321' }
      }
    });
    const next = buildNext();

    isInOrg(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are in this organization are allowed access', () => {
    const req = buildReq({
      user: buildUser({ org: '1234' })
    });
    const res = buildRes({
      locals: {
        org: { id: '1234' }
      }
    });
    const next = buildNext();

    isInOrg(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

// isInEvent
describe('Test isInEvent access middleware', () => {
  it('Workers who are not participants of this event are denied access', () => {
    const req = buildReq({
      user: buildUser({ id: '1234' })
    });
    const res = buildRes({
      locals: {
        event: {
          participants: [
            { worker: '4321' },
            { worker: '7890' },
            { worker: '5678' }
          ]
        }
      }
    });
    const next = buildNext();

    isInEvent(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.locals.participant).toBeUndefined();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Access denied'));
  });

  it('Workers who are participants of this event are allowed access', () => {
    const req = buildReq({
      user: buildUser({ id: '1234' })
    });
    const res = buildRes({
      locals: {
        event: {
          participants: [
            { worker: '4321' },
            { worker: '1234' },
            { worker: '5678' }
          ]
        }
      }
    });
    const next = buildNext();

    isInEvent(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.locals.participant).toBeDefined();
    expect(res.locals.participant).toEqual({ worker: '1234' });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
