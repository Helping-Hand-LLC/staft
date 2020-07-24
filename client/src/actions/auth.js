import api from '../utils/api';
import { AlertType, setAlert } from './alerts';
import * as ApiRoutes from '../constants/ApiRoutes';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: { token }
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const registerStart = () => ({
  type: REGISTER_START
});

export const registerSuccess = token => ({
  type: REGISTER_SUCCESS,
  payload: { token }
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE
});

export const logoutStart = () => ({
  type: LOGOUT_START
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE
});

// auth api calls
export const loginUser = (email, password) => async dispatch => {
  dispatch(loginStart());
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post(ApiRoutes.LOGIN, body);
    dispatch(loginSuccess(res.data.token));
    // set custom axios instance authorization to make subsequent authenticated requests
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    // show success message to user
    dispatch(setAlert('Successfully logged in', AlertType.SUCCESS));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = (
  email,
  password,
  passwordConfirm
) => async dispatch => {
  dispatch(registerStart());
  const body = JSON.stringify({ email, password, passwordConfirm });

  try {
    const res = await api.post(ApiRoutes.REGISTER, body);
    dispatch(registerSuccess(res.data.token));
    // set custom axios instance authorization to make subsequent authenticated requests
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    // tell the user to complete their profile
    dispatch(
      setAlert(
        'Complete your profile to access all features of Staft',
        AlertType.INFO
      )
    );
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  dispatch(logoutStart());
  // remove token from store and axios authorization header
  try {
    await api.get(ApiRoutes.LOGOUT);
    dispatch(logoutSuccess());
    delete api.defaults.headers.common['Authorization'];
    // show success message to user
    dispatch(setAlert('Successfully logged out', AlertType.SUCCESS));
  } catch (err) {
    dispatch(logoutFailure());
  }
};
