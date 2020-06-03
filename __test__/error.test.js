/* eslint-disable no-undef */
import { routeError } from '../utils/error';

describe('Test error utility', () => {
  it('error utility returns a correctly formatted error object with message', () => {
    expect(routeError('some error message')).toEqual({
      errors: [{ msg: 'some error message' }]
    });
  });

  it('error utility returns a general message if nothing was passed', () => {
    expect(routeError()).toEqual({
      errors: [{ msg: 'Route Error' }]
    });
  });
});
