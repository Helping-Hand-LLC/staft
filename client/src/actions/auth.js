import api from '../utils/api';
import { setAlert } from './alerts';

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
    // set custom axios instance authorization to make subsequent authenticated requests
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = (
  email,
  password,
  passwordConfirm
) => async dispatch => {
  const body = JSON.stringify({ email, password, passwordConfirm });

  try {
    const res = await api.post('/auth/register', body);
    dispatch(registerSuccess(res.data.token));
    // set custom axios instance authorization to make subsequent authenticated requests
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  // do not attempt to log out an unauthenticated user
  if (!token || !api.defaults.headers.common['Authorization']) {
    dispatch(logoutFailure());
    dispatch(setAlert('Could not log out unauthenticated user'));
    return;
  }
  // remove token from store and axios authorization header
  try {
    await api.get('/auth/logout');
    dispatch(logoutSuccess());
    delete api.defaults.headers.common['Authorization'];
  } catch (err) {
    dispatch(logoutFailure());
  }
};
