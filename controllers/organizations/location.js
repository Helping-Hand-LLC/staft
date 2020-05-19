const Location = require('../../models/Location');
const { Client, Status } = require('@googlemaps/google-maps-services-js');
const { routeError } = require('../../utils/error');
const { googleApiKey } = require('../../config/keys');

const client = new Client({});

module.exports = {
  getOrgEventLocations: async (req, res, next) => {
    const locations = await Location.find({
      organization: res.locals.org.id
    }).catch(err => next(err));

    if (!locations.length)
      return res.status(404).json(routeError('No locations found'));

    res.json({ locations });
  },
  getGoogleLocationsFromQuery: async (req, res, next) => {
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
              location: geometry.location,
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
  },
  createOrgEventLocation: async (req, res, next) => {
    const { formatted_address, location, icon, name, place_id } = req.body;

    // check if location exists
    let existingLocation = await Location.findOne({ place_id }).catch(err =>
      next(err)
    );

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
  }
};
