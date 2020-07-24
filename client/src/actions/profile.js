import api from '../utils/api';
import { AlertType, setAlert } from './alerts';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from './auth';
import * as ApiRoutes from '../constants/ApiRoutes';

export const GET_ME_START = 'GET_ME_START';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const GET_ME_FAILURE = 'GET_ME_FAILURE';

export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const CREATE_UPDATE_PROFILE_START = 'CREATE_UPDATE_PROFILE_START';
export const CREATE_UPDATE_PROFILE_SUCCESS = 'CREATE_UPDATE_PROFILE_SUCCESS';
export const CREATE_UPDATE_PROFILE_FAILURE = 'CREATE_UPDATE_PROFILE_FAILURE';

export const DELETE_PROFILE_START = 'DELETE_PROFILE_START';
export const DELETE_PROFILE_SUCCESS = 'DELETE_PROFILE_SUCCESS';
export const DELETE_PROFILE_FAILURE = 'DELETE_PROFILE_FAILURE';

export const getMeStart = () => ({
  type: GET_ME_START
});

export const getMeSuccess = user => ({
  type: GET_ME_SUCCESS,
  payload: { user }
});

export const getMeFailure = () => ({
  type: GET_ME_FAILURE
});

export const getProfileStart = () => ({
  type: GET_PROFILE_START
});

export const getProfileSuccess = profile => ({
  type: GET_PROFILE_SUCCESS,
  payload: { profile }
});

export const getProfileFailure = () => ({
  type: GET_PROFILE_FAILURE
});

export const createUpdateProfileStart = () => ({
  type: CREATE_UPDATE_PROFILE_START
});

export const createUpdateProfileSuccess = profile => ({
  type: CREATE_UPDATE_PROFILE_SUCCESS,
  payload: { profile }
});

export const createUpdateProfileFailure = () => ({
  type: CREATE_UPDATE_PROFILE_FAILURE
});

export const deleteProfileStart = () => ({
  type: DELETE_PROFILE_START
});

export const deleteProfileSuccess = () => ({
  type: DELETE_PROFILE_SUCCESS
});

export const deleteProfileFailure = () => ({
  type: DELETE_PROFILE_FAILURE
});

// auth api calls
export const getMe = () => async dispatch => {
  dispatch(getMeStart());

  try {
    const res = await api.get(ApiRoutes.GET_ME);
    dispatch(getMeSuccess(res.data.user));
  } catch (err) {
    dispatch(getMeFailure());
  }
};

export const getProfile = () => async dispatch => {
  dispatch(getProfileStart());

  try {
    const res = await api.get(ApiRoutes.GET_MY_PROFILE);
    dispatch(getProfileSuccess(res.data.populated));
  } catch (err) {
    dispatch(getProfileFailure());
  }
};

export const createOrUpdateProfile = (
  name,
  address,
  birthday,
  phone,
  gender,
  ssn
) => async dispatch => {
  dispatch(createUpdateProfileStart());
  const body = JSON.stringify({ name, address, birthday, phone, gender, ssn });

  try {
    const res = await api.post(ApiRoutes.CREATE_PROFILE, body);
    dispatch(createUpdateProfileSuccess(res.data.profile));
    dispatch(setAlert('Profile successfully updated', AlertType.SUCCESS));
  } catch (err) {
    dispatch(createUpdateProfileFailure());
  }
};

export const deleteUserAndProfile = () => async dispatch => {
  dispatch(deleteUserStart());
  dispatch(deleteProfileStart());

  try {
    await api.delete(ApiRoutes.DELETE_USER);
    dispatch(deleteUserSuccess());
    dispatch(deleteProfileSuccess());
    dispatch(
      setAlert('User and profile deleted successfully', AlertType.SUCCESS)
    );
  } catch (err) {
    dispatch(deleteUserFailure());
    dispatch(deleteProfileFailure());
  }
};
