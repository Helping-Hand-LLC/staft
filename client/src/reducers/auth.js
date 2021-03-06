import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/auth';

export default (
  state = {
    isLoading: false,
    token: null
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_START:
    case REGISTER_START:
    case LOGOUT_START:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { isLoading: false, token: payload.token };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_SUCCESS:
      return { isLoading: false, token: null };
    case LOGOUT_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
