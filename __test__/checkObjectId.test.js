/* eslint-disable no-undef */
import { buildReq, buildRes, buildNext } from './utils/generate';
import { Types } from 'mongoose';
import checkObjectId from '../middleware/checkObjectId';
import { routeError } from '../utils/error';

describe('Test checkObjectId middleware', () => {
  it('Returns early for invalid object id', () => {
    const middlwareFn = checkObjectId('idToCheck');

    const req = buildReq();
    req.params['idToCheck'] = 'some-Invalid-object-Id';
    const res = buildRes();
    const next = buildNext();

    middlwareFn(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(routeError('Invalid ObjectId'));
  });

  it('Passes to next middlware execution for valid objectId', () => {
    const middlwareFn = checkObjectId('idToCheck');

    const req = buildReq();
    req.params['idToCheck'] = `${Types.ObjectId()}`;
    const res = buildRes();
    const next = buildNext();

    middlwareFn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
