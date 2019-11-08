import { BATCHES_FETCHED, BATCH_CREATED } from '../actions/batches';

export default (state = [], action = {}) => {
  switch (action.type) {
    case BATCHES_FETCHED:
      return action.batches;
    case BATCH_CREATED:
      return [...state, action.batch];
    default:
      return state;
  }
};
