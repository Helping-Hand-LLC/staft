// auth
const authRoute = path => `/auth/${path}`;
// user
const userRoute = path => `/user/${path}`;
// org
const orgRoute = path => `/organizations/${path}`;
// worker
const workerRoute = path => `${orgRoute(':org_id/workers')}/${path}`;
// event
const eventRoute = path => `${orgRoute(':org_id/events')}/${path}`;
// location
const locationRoute = path => `${eventRoute('/locations')}/${path}`;

// REVIEW: api routes
export const LOGIN = authRoute('login');
export const REGISTER = authRoute('register');
export const LOGOUT = authRoute('logout');

export const GET_ME = userRoute('me');
export const GET_MY_PROFILE = userRoute('profile/me');
export const CREATE_PROFILE = userRoute('profile');
export const DELETE_USER = userRoute('profile');

export const GET_PUBLIC_ORGS = orgRoute('');
export const GET_MY_ORG = orgRoute(':org_id/me');
export const CREATE_ORG = orgRoute('');
export const UPDATE_ORG = orgRoute(':org_id');
export const ADD_WORKER_TO_ORG = orgRoute(':org_id/addWorker');
export const DELETE_ORG = orgRoute(':org_id');

export const GET_ORG_WORKERS = workerRoute('');
export const JOIN_ORG = workerRoute('join/me');
export const LEAVE_ORG = workerRoute('leave/me');

export const GET_ORG_EVENTS = eventRoute('');
export const GET_MY_ORG_EVENTS = eventRoute('me');
export const GET_SINGLE_EVENT = eventRoute(':event_id');
export const GET_MY_SINGLE_EVENT = eventRoute(':event_id/me');
export const CREATE_EVENT = eventRoute('');
export const UPDATE_EVENT = eventRoute(':event_id');
export const ADD_WORKER_TO_EVENT = eventRoute(':event_id/add');
export const REMOVE_WORKER_FROM_EVENT = eventRoute(':event_id/remove');
export const UPDATE_PARTICIPANT_STATUS = eventRoute(':event_id/me');
export const DELETE_EVENT = eventRoute(':event_id');

export const GET_STORED_LOCATIONS = locationRoute('stored');
export const QUERY_GOOGLE_LOCATIONS = locationRoute('query');
export const CREATE_LOCATION = locationRoute('');

// convert path placeholders with ObjectIds
export const convertApiPath = (path, orgId = '', eventId = '') => {
  // replace org_id placeholder
  if (path.includes(':org_id')) path = path.replace(':org_id', orgId);
  // replace event_id placeholder
  if (path.includes(':event_id')) path = path.replace(':event_id', eventId);

  return path;
};
