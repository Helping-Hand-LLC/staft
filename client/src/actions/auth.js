import api from '../utils/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: { token }
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const registerSuccess = token => ({
  type: REGISTER_SUCCESS,
  payload: { token }
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE
});

// auth api calls
export const loginUser = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth/login', body);
    dispatch(loginSuccess(res.data.token));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = () => dispatch => {};

export const logoutUser = () => dispatch => {};
