/* eslint-disable no-undef */
// const faker = require('faker');

// function buildUser() {}

function buildReq(adminStatus, userOrg) {
  const req = {
    user: {
      isAdmin: adminStatus,
      organization: userOrg
    }
  };
  return req;
}

function buildRes(orgId) {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    locals: {
      org: {
        id: orgId
      }
    }
  };
  return res;
}

module.exports = {
  buildReq,
  buildRes
};
