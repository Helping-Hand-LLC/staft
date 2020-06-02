/* eslint-disable no-undef */
function buildUser(
  { id, isAdmin, isManager, org } = { isAdmin: false, isManager: false }
) {
  return {
    id,
    isAdmin,
    isManager,
    organization: org
  };
}

function buildReq({ user, ...overrides } = { user: buildUser() }) {
  const req = { user, body: {}, params: {}, ...overrides };
  return req;
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides
  };
  return res;
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next');
}

module.exports = {
  buildUser,
  buildReq,
  buildRes,
  buildNext
};
