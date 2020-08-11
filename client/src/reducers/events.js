import {
  GET_ALL_ORG_EVENTS_START,
  GET_ALL_ORG_EVENTS_SUCCESS,
  GET_ALL_ORG_EVENTS_FAILURE,
  GET_MY_ORG_EVENTS_START,
  GET_MY_ORG_EVENTS_SUCCESS,
  GET_MY_ORG_EVENTS_FAILURE,
  CREATE_EVENT_START,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  UPDATE_EVENT_START,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  DELETE_EVENT_START,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  ADD_PARTICIPANT_START,
  ADD_PARTICIPANT_SUCCESS,
  ADD_PARTICIPANT_FAILURE,
  REMOVE_PARTICIPANT_START,
  REMOVE_PARTICIPANT_SUCCESS,
  REMOVE_PARTICIPANT_FAILURE,
  UPDATE_PARTICIPANT_STATUS_START,
  UPDATE_PARTICIPANT_STATUS_SUCCESS,
  UPDATE_PARTICIPANT_STATUS_FAILURE
} from '../actions/events';
import { stat } from 'fs';

export default (
  state = {
    isLoading: false,
    allOrgEvents: [],
    myOrgEvents: []
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ORG_EVENTS_START:
    case GET_MY_ORG_EVENTS_START:
    case CREATE_EVENT_START:
    case UPDATE_EVENT_START:
    case DELETE_EVENT_START:
    case ADD_PARTICIPANT_START:
    case REMOVE_PARTICIPANT_START:
    case UPDATE_PARTICIPANT_STATUS_START:
      return { ...state, isLoading: true };
    case GET_ALL_ORG_EVENTS_SUCCESS:
      return { ...state, isLoading: false, allOrgEvents: payload.allOrgEvents };
    case GET_MY_ORG_EVENTS_SUCCESS:
      return { ...state, isLoading: false, myOrgEvents: payload.myOrgEvents };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrgEvents: [...state.allOrgEvents, payload.event]
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrgEvents: state.allOrgEvents.map(e => {
          if (e._id === payload.id) return payload.event;
          return e;
        })
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrgEvents: state.allOrgEvents.filter(e => e._id !== payload.id)
      };
    case ADD_PARTICIPANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrgEvents: state.allOrgEvents.map(e => {
          if (e._id === payload.id) {
            e.participants = payload.participants;
          }
          return e;
        })
      };
    case REMOVE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrgEvents: state.allOrgEvents.map(e => {
          if (e._id === payload.id) {
            e.participants.filter(p => p._id !== payload.workerId);
          }
          return e;
        })
      };
    case UPDATE_PARTICIPANT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myOrgEvents: state.myOrgEvents.map(e => {
          if (e._id === payload.id) {
            const pIndex = e.participants.findIndex(
              p => p._id === payload.updatedWorker._id
            );
            e.participants[pIndex] = payload.updatedWorker;
          }
          return e;
        })
      };
    case GET_ALL_ORG_EVENTS_FAILURE:
    case GET_MY_ORG_EVENTS_FAILURE:
    case CREATE_EVENT_FAILURE:
    case UPDATE_EVENT_FAILURE:
    case DELETE_EVENT_FAILURE:
    case ADD_PARTICIPANT_FAILURE:
    case REMOVE_PARTICIPANT_FAILURE:
    case UPDATE_PARTICIPANT_STATUS_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
