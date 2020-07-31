import api from '../utils/api';
import * as ApiRoutes from '../constants/ApiRoutes';

export const CREATE_LOCATION_START = 'CREATE_LOCATION_START';
export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_FAILURE = 'CREATE_LOCATION_FAILURE';

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
