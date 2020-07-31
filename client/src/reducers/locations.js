import {
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
    case CREATE_LOCATION_START:
      return { ...state, isLoading: true };
    case CREATE_LOCATION_SUCCESS:
      return {
        isLoading: false,
        storedLocations: [...state.storedLocations, payload.location]
      };
    case CREATE_LOCATION_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
