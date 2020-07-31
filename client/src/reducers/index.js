import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import profile from './profile';
import org from './org';
import locations from './locations';

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
  org,
  locations
});

export default rootReducer;
