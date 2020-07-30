import api from '../utils/api';
import { AlertType, setAlert } from './alerts';
import * as ApiRoutes from '../constants/ApiRoutes';
import { logoutUser } from './auth';

export const GET_MY_ORG_START = 'GET_MY_ORG_START';
export const GET_MY_ORG_SUCCESS = 'GET_MY_ORG_SUCCESS';
export const GET_MY_ORG_FAILURE = 'GET_MY_ORG_FAILURE';

export const UPDATE_ORG_START = 'UPDATE_ORG_START';
export const UPDATE_ORG_SUCCESS = 'UPDATE_ORG_SUCCESS';
export const UPDATE_ORG_FAILURE = 'UPDATE_ORG_FAILURE';

export const ADD_WORKER_START = 'ADD_WORKER_START';
export const ADD_WORKER_SUCCESS = 'ADD_WORKER_SUCCESS';
export const ADD_WORKER_FAILURE = 'ADD_WORKER_FAILURE';

export const DELETE_ORG_START = 'DELETE_ORG_START';
export const DELETE_ORG_SUCCESS = 'DELETE_ORG_SUCCESS';
export const DELETE_ORG_FAILURE = 'DELETE_ORG_FAILURE';

export const WorkerAccess = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  WORKER: 'worker'
};

export const getMyOrgStart = () => ({
  type: GET_MY_ORG_START
});

export const getMyOrgSuccess = org => ({
  type: GET_MY_ORG_SUCCESS,
  payload: { org }
});

export const getMyOrgFailure = () => ({
  type: GET_MY_ORG_FAILURE
});

export const updateOrgStart = () => ({
  type: UPDATE_ORG_START
});

export const updateOrgSuccess = org => ({
  type: UPDATE_ORG_SUCCESS,
  payload: { org }
});

export const updateOrgFailure = () => ({
  type: UPDATE_ORG_FAILURE
});

export const addWorkerStart = () => ({
  type: ADD_WORKER_START
});

export const addWorkerSuccess = worker => ({
  type: ADD_WORKER_SUCCESS,
  payload: { worker }
});

export const addWorkerFailure = () => ({
  type: ADD_WORKER_FAILURE
});

export const deleteOrgStart = () => ({
  type: DELETE_ORG_START
});

export const deleteOrgSuccess = () => ({
  type: DELETE_ORG_SUCCESS
});

export const deleteOrgFailure = () => ({
  type: DELETE_ORG_FAILURE
});

// org api calls
export const getMyOrg = orgId => async dispatch => {
  dispatch(getMyOrgStart());

  try {
    const res = await api.get(
      ApiRoutes.convertApiPath(ApiRoutes.GET_MY_ORG, orgId)
    );
    dispatch(getMyOrgSuccess(res.data.org));
  } catch (err) {
    dispatch(getMyOrgFailure());
  }
};

export const updateOrg = (orgId, uid, isPrivate) => async dispatch => {
  dispatch(updateOrgStart());
  const body = JSON.stringify({ uid, isPrivate });

  try {
    const res = await api.put(
      ApiRoutes.convertApiPath(ApiRoutes.UPDATE_ORG, orgId),
      body
    );
    dispatch(updateOrgSuccess(res.data.org));
    dispatch(setAlert('Organization successfully updated', AlertType.SUCCESS));
  } catch (err) {
    dispatch(updateOrgFailure());
  }
};

export const addWorkerToOrg = (
  orgId,
  workerEmail,
  access
) => async dispatch => {
  dispatch(addWorkerStart());
  const body = JSON.stringify({ workerEmail, access });

  try {
    const res = await api.patch(
      ApiRoutes.convertApiPath(ApiRoutes.ADD_WORKER_TO_ORG, orgId),
      body
    );
    dispatch(addWorkerSuccess(res.data.worker));
    dispatch(
      setAlert(
        `${res.data.worker.email} successfully added to your organization`,
        AlertType.SUCCESS
      )
    );
  } catch (err) {
    dispatch(addWorkerFailure());
  }
};

export const deleteOrg = orgId => async dispatch => {
  dispatch(deleteOrgStart());

  try {
    await api.delete(ApiRoutes.convertApiPath(ApiRoutes.DELETE_ORG, orgId));
    dispatch(deleteOrgSuccess());
    dispatch(
      setAlert(
        'Organization successfully deleted. Please log in again',
        AlertType.SUCCESS
      )
    );
    dispatch(logoutUser());
  } catch (err) {
    dispatch(deleteOrgFailure());
  }
};
