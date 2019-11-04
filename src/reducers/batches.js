import { BATCHES_FETCHED, BATCH_CREATED } from '../actions/batches';

export default (state = null, action = {}) => {
  console.log('check reducer state', state);
  console.log('check action event', action.batch);
  switch (action.type) {
    case BATCHES_FETCHED:
      return action.batches;
    case BATCH_CREATED:
      return [...state, action.batch];
    // case EVENT_DELETED:
    //     return state.filter(event => event.id !== action.eventId);
    default:
      return state;
  }
};
