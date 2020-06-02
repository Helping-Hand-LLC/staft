const { describe, it } = require('@jest/globals');
const app = require('../app');
const request = require('supertest');

describe('Test the root path', () => {
  it('It should response the GET method', () => {
    return request(app).get('/').expect(200);
  });
});