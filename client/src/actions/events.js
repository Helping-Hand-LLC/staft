import api from '../utils/api';
import { AlertType, setAlert } from './alerts';
import * as ApiRoutes from '../constants/ApiRoutes';

export const GET_ALL_ORG_EVENTS_START = 'GET_ALL_ORG_EVENTS_START';
export const GET_ALL_ORG_EVENTS_SUCCESS = 'GET_ALL_ORG_EVENTS_SUCCESS';
export const GET_ALL_ORG_EVENTS_FAILURE = 'GET_ALL_ORG_EVENTS_FAILURE';

export const GET_MY_ORG_EVENTS_START = 'GET_MY_ORG_EVENTS_START';
export const GET_MY_ORG_EVENTS_SUCCESS = 'GET_MY_ORG_EVENTS_SUCCESS';
export const GET_MY_ORG_EVENTS_FAILURE = 'GET_MY_ORG_EVENTS_FAILURE';

export const CREATE_EVENT_START = 'CREATE_EVENT_START';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const UPDATE_EVENT_START = 'UPDATE_EVENT_START';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export const DELETE_EVENT_START = 'DELETE_EVENT_START';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const ADD_PARTICIPANT_START = 'ADD_PARTICIPANT_START';
export const ADD_PARTICIPANT_SUCCESS = 'ADD_PARTICIPANT_SUCCESS';
export const ADD_PARTICIPANT_FAILURE = 'ADD_PARTICIPANT_FAILURE';

export const REMOVE_PARTICIPANT_START = 'REMOVE_PARTICIPANT_START';
export const REMOVE_PARTICIPANT_SUCCESS = 'REMOVE_PARTICIPANT_SUCCESS';
export const REMOVE_PARTICIPANT_FAILURE = 'REMOVE_PARTICIPANT_FAILURE';

export const UPDATE_PARTICIPANT_STATUS_START =
  'UPDATE_PARTICIPANT_STATUS_START';
export const UPDATE_PARTICIPANT_STATUS_SUCCESS =
  'UPDATE_PARTICIPANT_STATUS_SUCCESS';
export const UPDATE_PARTICIPANT_STATUS_FAILURE =
  'UPDATE_PARTICIPANT_STATUS_FAILURE';

export const getAllOrgEventsStart = () => ({
  type: GET_ALL_ORG_EVENTS_START
});

export const getAllOrgEventsSuccess = allOrgEvents => ({
  type: GET_ALL_ORG_EVENTS_SUCCESS,
  payload: { allOrgEvents }
});

export const getAllOrgEventsFailure = () => ({
  type: GET_ALL_ORG_EVENTS_FAILURE
});

export const getMyOrgEventsStart = () => ({
  type: GET_MY_ORG_EVENTS_START
});

export const getMyOrgEventsSuccess = myOrgEvents => ({
  type: GET_MY_ORG_EVENTS_SUCCESS,
  payload: { myOrgEvents }
});

export const getMyOrgEventsFailure = () => ({
  type: GET_MY_ORG_EVENTS_FAILURE
});

export const createEventStart = () => ({
  type: CREATE_EVENT_START
});

export const createEventSuccess = event => ({
  type: CREATE_EVENT_SUCCESS,
  payload: { event }
});

export const createEventFailure = () => ({
  type: CREATE_EVENT_FAILURE
});

export const udpateEventStart = () => ({
  type: UPDATE_EVENT_START
});

export const udpateEventSuccess = (id, event) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: { id, event }
});

export const updateEventFailure = () => ({
  type: UPDATE_EVENT_FAILURE
});

export const deleteEventStart = () => ({
  type: DELETE_EVENT_START
});

export const deleteEventSuccess = id => ({
  type: DELETE_EVENT_SUCCESS,
  payload: { id }
});

export const deleteEventFailure = () => ({
  type: DELETE_EVENT_FAILURE
});

export const addParticipantStart = () => ({
  type: ADD_PARTICIPANT_START
});

export const addParticipantSuccess = (id, participants) => ({
  type: ADD_PARTICIPANT_SUCCESS,
  payload: { id, participants }
});

export const addParticipantFailure = () => ({
  type: ADD_PARTICIPANT_FAILURE
});

export const removeParticipantStart = () => ({
  type: REMOVE_PARTICIPANT_START
});

export const removeParticipantSuccess = (id, workerId) => ({
  type: REMOVE_PARTICIPANT_SUCCESS,
  payload: { id, workerId }
});

export const removeParticipantFailure = () => ({
  type: REMOVE_PARTICIPANT_FAILURE
});

export const updateParticipantStatusStart = () => ({
  type: UPDATE_PARTICIPANT_STATUS_START
});

export const updateParticipantStatusSuccess = (id, updatedWorker) => ({
  type: UPDATE_PARTICIPANT_STATUS_SUCCESS,
  payload: { id, updatedWorker }
});

export const updateParticipantStatusFailure = () => ({
  type: UPDATE_PARTICIPANT_STATUS_FAILURE
});

// event api calls
export const getAllOrgEvents = orgId => async dispatch => {
  dispatch(getAllOrgEventsStart());

  try {
    const res = await api.get(
      ApiRoutes.convertApiPath(ApiRoutes.GET_ORG_EVENTS, orgId)
    );
    dispatch(getAllOrgEventsSuccess(res.data.orgEvents));
  } catch (err) {
    dispatch(getAllOrgEventsFailure());
  }
};

export const getMyOrgEvents = orgId => async dispatch => {
  dispatch(getMyOrgEventsStart());

  try {
    const res = await api.get(
      ApiRoutes.convertApiPath(ApiRoutes.GET_MY_ORG_EVENTS, orgId)
    );
    dispatch(getMyOrgEventsSuccess(res.data.myOrgEvents));
  } catch (err) {
    dispatch(getMyOrgEventsFailure());
  }
};

export const createEvent = (orgId, eventData) => async dispatch => {
  dispatch(createEventStart());
  const body = JSON.stringify(eventData);

  try {
    const res = await api.post(
      ApiRoutes.convertApiPath(ApiRoutes.CREATE_EVENT, orgId),
      body
    );
    dispatch(createEventSuccess(res.data.event));
    dispatch(setAlert('Event successfully created', AlertType.SUCCESS));
    // re-fetch myOrgEvents
    dispatch(getMyOrgEvents(orgId));
  } catch (err) {
    dispatch(createEventFailure());
  }
};

export const updateEvent = (orgId, eventId, updatedData) => async dispatch => {
  dispatch(udpateEventStart());
  const body = JSON.stringify(updatedData);

  try {
    const res = await api.put(
      ApiRoutes.convertApiPath(ApiRoutes.UPDATE_EVENT, orgId, eventId),
      body
    );
    dispatch(udpateEventSuccess(res.data.event));
    dispatch(setAlert('Event successfully updated', AlertType.SUCCESS));
    // re-fetch myOrgEvents
    dispatch(getMyOrgEvents(orgId));
  } catch (err) {
    dispatch(updateEventFailure());
  }
};

export const deleteEvent = (orgId, eventId) => async dispatch => {
  dispatch(deleteEventStart());

  try {
    await api.delete(
      ApiRoutes.convertApiPath(ApiRoutes.DELETE_EVENT, orgId, eventId)
    );
    dispatch(deleteEventSuccess(eventId));
    dispatch(setAlert('Event successfully deleted', AlertType.SUCCESS));
    // re-fetch myOrgEvents
    dispatch(getMyOrgEvents(orgId));
  } catch (err) {
    dispatch(deleteEventFailure());
  }
};

export const addParticipant = (orgId, eventId, workerId) => async dispatch => {
  dispatch(addParticipantStart());
  const body = JSON.stringify({ worker: workerId });

  try {
    const res = await api.patch(
      ApiRoutes.convertApiPath(ApiRoutes.ADD_WORKER_TO_EVENT, orgId, eventId),
      body
    );
    dispatch(addParticipantSuccess(eventId, res.data.participants));
    dispatch(setAlert('Worker successfully added', AlertType.SUCCESS));
    // re-fetch myOrgEvents
    dispatch(getMyOrgEvents(orgId));
  } catch (err) {
    dispatch(addParticipantFailure());
  }
};

export const removeParticipant = (
  orgId,
  eventId,
  workerId
) => async dispatch => {
  dispatch(removeParticipantStart());
  const body = JSON.stringify({ worker: workerId });

  try {
    await api.patch(
      ApiRoutes.convertApiPath(
        ApiRoutes.REMOVE_WORKER_FROM_EVENT,
        orgId,
        eventId
      ),
      body
    );
    dispatch(removeParticipantSuccess(eventId, workerId));
    dispatch(setAlert('Worker successfully removed', AlertType.SUCCESS));
    // re-fetch myOrgEvents
    dispatch(getMyOrgEvents(orgId));
  } catch (err) {
    dispatch(removeParticipantFailure());
  }
};

export const updateParticipantStatus = (
  orgId,
  eventId,
  statusData
) => async dispatch => {
  dispatch(updateParticipantStatusStart());
  const body = JSON.stringify(statusData);

  try {
    const res = await api.patch(
      ApiRoutes.convertApiPath(
        ApiRoutes.UPDATE_PARTICIPANT_STATUS,
        orgId,
        eventId
      ),
      body
    );
    dispatch(updateParticipantStatusSuccess(eventId, res.data.participant));
    // re-fetch myOrgEvents
    dispatch(getMyOrgEvents(orgId));
  } catch (err) {
    dispatch(updateParticipantStatusFailure());
  }
};
