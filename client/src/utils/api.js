import axios from 'axios';

const api = axios.create({
  // TODO: baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 3000
});

// set alerts for axios response errors
api.interceptors.response.use(
  res => res,
  err => {
    console.log(err.response);
    // const errors = err.response.data.errors;

    // if (errors)
    //   errors.forEach(e => {
    //     let errorMsg = e.msg;
    //     // show what parameter was the issue for a generic error response message
    //     if (errorMsg === 'Invalid value') errorMsg = `${e.param}: ${errorMsg}`;

    //     // TODO: set a new alert for each error
    //     console.log('axios interceptor:', errorMsg);
    //   });
  }
);

export default api;
