import { v4 as uuidv4 } from 'uuid';

export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const AlertType = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  INFO: 'INFO'
};

export const addAlert = (msg, alertType) => ({
  type: ADD_ALERT,
  payload: {
    id: uuidv4(),
    msg,
    alertType
  }
});

export const removeAlert = id => ({
  type: REMOVE_ALERT,
  payload: { id }
});

export const setAlert = (
  msg,
  alertType = AlertType.ERROR,
  timeout = 5000
) => dispatch => {
  // create an alert to dispatch
  const newAlert = addAlert(msg, alertType);
  // dispatch this new alert
  dispatch(newAlert);
  // remove new alert after timeout
  setTimeout(() => dispatch(removeAlert(newAlert.payload.id)), timeout);
};
