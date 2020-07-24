import {
  GET_ME_START,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CREATE_UPDATE_PROFILE_START,
  CREATE_UPDATE_PROFILE_SUCCESS,
  CREATE_UPDATE_PROFILE_FAILURE,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_PROFILE_START,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE
} from '../actions/profile';

// REVIEW: move user to auth (authentication, local storage)?

export default (
  state = {
    isLoading: false,
    user: null,
    data: null
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ME_START:
    case GET_PROFILE_START:
    case CREATE_UPDATE_PROFILE_START:
    case DELETE_USER_START:
    case DELETE_PROFILE_START:
      return { ...state, isLoading: true };
    case GET_ME_SUCCESS:
      return { ...state, isLoading: false, user: payload.user };
    case GET_PROFILE_SUCCESS:
    case CREATE_UPDATE_PROFILE_SUCCESS:
      return { ...state, isLoading: false, data: payload.profile };
    case GET_ME_FAILURE:
      return { ...state, isLoading: false, user: null };
    case GET_PROFILE_FAILURE:
    case CREATE_UPDATE_PROFILE_FAILURE:
    case DELETE_USER_SUCCESS:
    case DELETE_PROFILE_SUCCESS:
      return { ...state, isLoading: false, user: null, data: null };
    case DELETE_USER_FAILURE:
    case DELETE_PROFILE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
