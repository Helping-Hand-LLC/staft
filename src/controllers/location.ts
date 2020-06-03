import _ from 'lodash';
import Location from '../models/Location';
import { Client, Status } from '@googlemaps/google-maps-services-js';
import MiddlewareFn from '../config/middleware';
import { googleApiKey } from '../config/keys';
import routeError from '../utils/error';

const client = new Client({});

export const getAllStoredLocations: MiddlewareFn = async (_req, res, next) => {
  try {
    const locations = await Location.find({
      organization: res.locals.org.id
    });

    if (_.isEmpty(locations))
      return res.status(404).json(routeError('No locations found'));

    res.json({ locations });
  } catch (err) {
    return next(err);
  }
};

export const queryGoogleLocations: MiddlewareFn = (req, res, next) => {
  const { query } = req.body;

  client
    .textSearch({
      params: {
        key: googleApiKey,
        query
      }
    })
    .then(r => {
      if (r.data.status === Status.OK) {
        const response = [];
        for (let i = 0; i < r.data.results.length; i++) {
          const {
            formatted_address,
            geometry,
            icon,
            name,
            place_id
          } = r.data.results[i];
          response.push({
            formatted_address,
            location: geometry?.location,
            icon,
            name,
            place_id
          });
        }

        return res.json({ response });
      }
      return res
        .status(500)
        .json(routeError(`Something went wrong searching for: ${query}`));
    })
    .catch(err => next(err));
};

export const createLocation: MiddlewareFn = async (req, res, next) => {
  const { formatted_address, location, icon, name, place_id } = req.body;

  try {
    // check if location exists
    let existingLocation = await Location.findOne({ place_id });

    if (existingLocation)
      return res.status(400).json(routeError('Location already exists'));

    // create new location
    existingLocation = new Location({
      organization: res.locals.org.id,
      formatted_address,
      geometry: location,
      icon,
      name,
      place_id
    });
    await existingLocation.save();
    return res.json({ location: existingLocation });
  } catch (err) {
    return next(err);
  }
};
