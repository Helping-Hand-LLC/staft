import {
  GET_MY_ORG_START,
  GET_MY_ORG_SUCCESS,
  GET_MY_ORG_FAILURE,
  GET_ALL_ORG_WORKERS_START,
  GET_ALL_ORG_WORKERS_SUCCESS,
  GET_ALL_ORG_WORKERS_FAILURE,
  UPDATE_ORG_START,
  UPDATE_ORG_SUCCESS,
  UPDATE_ORG_FAILURE,
  DELETE_ORG_START,
  DELETE_ORG_SUCCESS,
  DELETE_ORG_FAILURE
} from '../actions/org';

export default (
  state = {
    isLoading: false,
    myOrg: null,
    allOrgWorkers: []
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_ORG_START:
    case GET_ALL_ORG_WORKERS_START:
    case UPDATE_ORG_START:
    case DELETE_ORG_START:
      return { ...state, isLoading: true };
    case GET_MY_ORG_SUCCESS:
    case UPDATE_ORG_SUCCESS:
      return { ...state, isLoading: false, myOrg: payload.org };
    case GET_ALL_ORG_WORKERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allOrgWorkers: payload.allOrgWorkers
      };
    case DELETE_ORG_SUCCESS:
      return { isLoading: false, myOrg: null, allOrgWorkers: [] };
    case GET_ALL_ORG_WORKERS_FAILURE:
      return { ...state, isLoading: false, allOrgWorkers: [] };
    case GET_MY_ORG_FAILURE:
    case UPDATE_ORG_FAILURE:
    case DELETE_ORG_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
