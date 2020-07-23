import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import { setAlert } from '../actions/alerts';

const api = axios.create({
  // TODO: baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000
});

// set alerts for axios response errors
api.interceptors.response.use(
  res => res,
  err => {
    // check for routeError
    if (_.has(err.response.data, 'errors')) {
      err.response.data.errors.forEach(e => {
        let errorMsg = e.msg;
        // show what parameter was the issue for a generic error response message
        if (errorMsg === 'Invalid value') errorMsg = `${e.param}: ${errorMsg}`;
        // set a new alert for each error
        store.dispatch(setAlert(errorMsg));
      });
    }
    // default Express error
    else {
      store.dispatch(setAlert(`${err.response.status}: Something went wrong`));
    }
    return Promise.reject(err);
  }
);

export default api;
