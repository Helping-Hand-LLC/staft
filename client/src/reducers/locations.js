import {
  GET_STORED_LOCATIONS_START,
  GET_STORED_LOCATIONS_SUCCESS,
  GET_STORED_LOCATIONS_FAILURE,
  CREATE_LOCATION_START,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE
} from '../actions/locations';

export default (
  state = {
    isLoading: false,
    storedLocations: []
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_STORED_LOCATIONS_START:
    case CREATE_LOCATION_START:
      return { ...state, isLoading: true };
    case GET_STORED_LOCATIONS_SUCCESS:
      return { isLoading: false, storedLocations: payload.storedLocations };
    case CREATE_LOCATION_SUCCESS:
      return {
        isLoading: false,
        storedLocations: [...state.storedLocations, payload.location]
      };
    case GET_STORED_LOCATIONS_FAILURE:
    case CREATE_LOCATION_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
