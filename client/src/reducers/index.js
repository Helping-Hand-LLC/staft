import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import profile from './profile';
import org from './org';

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
  org
});

export default rootReducer;
