import axios from 'axios';
import _ from 'lodash';

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
        // TODO: set a new alert for each error
        console.log('route error:', errorMsg);
      });
    }
    // default Express error
    else {
      console.log(
        `default express error: ${err.response.status}: Something went wrong`
      );
    }
  }
);

export default api;
