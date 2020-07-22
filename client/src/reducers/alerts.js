import { ADD_ALERT, REMOVE_ALERT } from '../actions/alerts';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(a => a.id != payload.id);
    default:
      return state;
  }
};
