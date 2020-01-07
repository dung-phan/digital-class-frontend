import {
  BATCHES_FETCHED,
  BATCH_CREATED,
  BATCH_DELETED
} from "../actions/batches";
export default (state = [], action = {}) => {
  switch (action.type) {
    case BATCHES_FETCHED:
      return action.batches;
    case BATCH_CREATED:
      return [...state, action.batch];
    case BATCH_DELETED:
      return state.filter(batch => batch.id !== action.batchId);
    default:
      return state;
  }
};
