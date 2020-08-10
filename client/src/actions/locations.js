import api from '../utils/api';
import * as ApiRoutes from '../constants/ApiRoutes';

export const GET_STORED_LOCATIONS_START = 'GET_STORED_LOCATIONS_START';
export const GET_STORED_LOCATIONS_SUCCESS = 'GET_STORED_LOCATIONS_SUCCESS';
export const GET_STORED_LOCATIONS_FAILURE = 'GET_STORED_LOCATIONS_FAILURE';

export const CREATE_LOCATION_START = 'CREATE_LOCATION_START';
export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_FAILURE = 'CREATE_LOCATION_FAILURE';

export const getStoredLocationsStart = () => ({
  type: GET_STORED_LOCATIONS_START
});

export const getStoredLocationsSuccess = storedLocations => ({
  type: GET_STORED_LOCATIONS_SUCCESS,
  payload: { storedLocations }
});

export const getStoredLocationsFailure = () => ({
  type: GET_STORED_LOCATIONS_FAILURE
});

export const createLocationStart = () => ({
  type: CREATE_LOCATION_START
});

export const createLocationSuccess = location => ({
  type: CREATE_LOCATION_SUCCESS,
  payload: { location }
});

export const createLocationFailure = () => ({
  type: CREATE_LOCATION_FAILURE
});

// location api calls
export const getStoredLocations = orgId => async dispatch => {
  dispatch(getStoredLocationsStart());

  try {
    const res = await api.get(
      ApiRoutes.convertApiPath(ApiRoutes.GET_STORED_LOCATIONS, orgId)
    );
    dispatch(getStoredLocationsSuccess(res.data.locations));
  } catch (err) {
    dispatch(getStoredLocationsFailure());
  }
};

export const createLocation = (orgId, locationData) => async dispatch => {
  dispatch(createLocationStart());
  // locationData comes from google query results, already formatted
  const body = JSON.stringify(locationData);

  try {
    const res = await api.post(
      ApiRoutes.convertApiPath(ApiRoutes.CREATE_LOCATION, orgId),
      body
    );
    dispatch(createLocationSuccess(res.data.location));
  } catch (err) {
    dispatch(createLocationFailure());
  }
};
