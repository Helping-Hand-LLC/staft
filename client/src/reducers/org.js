import {
  GET_MY_ORG_START,
  GET_MY_ORG_SUCCESS,
  GET_MY_ORG_FAILURE,
  UPDATE_ORG_START,
  UPDATE_ORG_SUCCESS,
  UPDATE_ORG_FAILURE,
  ADD_WORKER_START,
  ADD_WORKER_SUCCESS,
  ADD_WORKER_FAILURE,
  DELETE_ORG_START,
  DELETE_ORG_SUCCESS,
  DELETE_ORG_FAILURE
} from '../actions/org';

export default (
  state = {
    isLoading: false,
    myOrg: null,
    myOrgWorkers: []
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_ORG_START:
    case UPDATE_ORG_START:
    case ADD_WORKER_START:
    case DELETE_ORG_START:
      return { ...state, isLoading: true };
    case GET_MY_ORG_SUCCESS:
    case UPDATE_ORG_SUCCESS:
      return { ...state, isLoading: false, myOrg: payload.org };
    case ADD_WORKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myOrgWorkers: [...state.myOrgWorkers, payload.worker]
      };
    case DELETE_ORG_SUCCESS:
      return { isLoading: false, myOrg: null, myOrgWorkers: [] };
    case GET_MY_ORG_FAILURE:
    case UPDATE_ORG_FAILURE:
    case ADD_WORKER_FAILURE:
    case DELETE_ORG_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
