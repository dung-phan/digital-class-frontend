import { BATCH_FETCHED } from '../actions/batches';

export default (state = null, action = {}) => {
  //   console.log('check reducer state', state);
  //   console.log('check action event', action.batch);
  switch (action.type) {
    case BATCH_FETCHED:
      return action.batch;

    default:
      return state;
  }
};
