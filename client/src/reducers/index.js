import { combineReducers } from 'redux';
import alerts from './alerts';
import auth from './auth';
import profile from './profile';
import org from './org';
import locations from './locations';
import events from './events';

const rootReducer = combineReducers({
  alerts,
  auth,
  profile,
  org,
  locations,
  events
});

export default rootReducer;
