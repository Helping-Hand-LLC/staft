/* eslint-disable no-undef */
const { routeError } = require('../utils/error');

test('error utility returns a correctly formatted error object with message', () => {
  expect(routeError('some error message')).toEqual({
    errors: [{ msg: 'some error message' }]
  });
});

test('error utility returns a general message if nothing was passed', () => {
  expect(routeError()).toEqual({
    errors: [{ msg: 'Route Error' }]
  });
});
