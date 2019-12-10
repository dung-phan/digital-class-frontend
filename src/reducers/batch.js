import { BATCH_FETCHED } from '../actions/batches';

export default (state = null, action = {}) => {
  switch (action.type) {
    case BATCH_FETCHED:
      return action.batch;

    default:
      return state;
  }
};
