/* eslint-disable no-undef */
const app = require('../app');
const request = require('supertest');

describe('Test auth login route', () => {
  it('Throws errors if email and password are not sent in request body', () => {
    return request(app)
      .post('/auth/login')
      .send({})
      .expect(400, {
        errors: [
          { msg: 'Invalid value', param: 'email', location: 'body' },
          {
            msg: 'Please enter a valid email',
            param: 'email',
            location: 'body'
          },
          {
            msg: 'Password is required',
            param: 'password',
            location: 'body'
          }
        ]
      });
  });

  it('Throws error for invalid email', () => {
    return request(app)
      .post('/auth/login')
      .send({
        email: 'some-invalid-email@',
        password: '123456'
      })
      .expect(400, {
        errors: [
          {
            value: 'some-invalid-email@',
            msg: 'Please enter a valid email',
            param: 'email',
            location: 'body'
          }
        ]
      });
  });

  // it('Throws 404 user not found for email and password that do not exist in MongoDB', () => {
  //   return request(app)
  //     .post('/auth/login')
  //     .send({
  //       email: 'some-invalid-email@',
  //       password: '123456'
  //     })
  //     .expect(400, {
  //       errors: [
  //         { msg: 'Invalid value', param: 'email', location: 'body' },
  //         {
  //           msg: 'Please enter a valid email',
  //           param: 'email',
  //           location: 'body'
  //         }
  //       ]
  //     });
  // });

  // it('Returns JWT token for valid email and password', () => {
  //   return request(app)
  //     .post('/auth/login')
  //     .send({
  //       email: ''
  //     })
  //     .expect(400, {
  //       errors: [
  //         { msg: 'Invalid value', param: 'email', location: 'body' },
  //         {
  //           msg: 'Please enter a valid email',
  //           param: 'email',
  //           location: 'body'
  //         },
  //         {
  //           msg: 'Password is required',
  //           param: 'password',
  //           location: 'body'
  //         }
  //       ]
  //     });
  // });
});

// TODO: describe('Test auth register route', () => {});

// TODO: describe('Test auth logout route', () => {});
