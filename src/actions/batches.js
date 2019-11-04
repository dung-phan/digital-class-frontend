import superagent from 'superagent';
import { baseUrl } from '../constants';
export const BATCHES_FETCHED = 'BATCHES_FETCHED';
export const BATCH_CREATED = 'BATCH_CREATED';
// export const EVENT_FETCHED = 'EVENT_FETCHED';
// export const EVENT_DELETED = 'EVENT_DELETED';
// export const EVENT_UPDATED = 'EVENT_UPDATED';

const batchesFetched = batches => ({
  type: BATCHES_FETCHED,
  batches
});
const batchCreate = batch => ({
  type: BATCH_CREATED,
  batch
});
// const eventFetched = event => ({
//   type: EVENT_FETCHED,
//   event
// });
// const eventDelete = eventId => ({
//   type: EVENT_DELETED,
//   eventId
// });
// const eventUpdate = (eventId, event) => ({
//   type: EVENT_UPDATED,
//   eventId,
//   event
// });
//dispatch action to loadEvent with thunk
export const loadBatches = () => dispatch => {
  //if there're always events fetched, stop fetching
  //if (getState().events) return;
  //get events request
  superagent(`${baseUrl}/batches`)
    .then(response => dispatch(batchesFetched(response.body))) //passing response.body (which contains events we fetch) as events argument in the eventsFetched function.
    .catch(console.error);
};

export const createBatch = batch => (dispatch, getState) => {
  console.log('what is batch', batch);
  superagent
    .post(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${getState().user}`)
    .send(batch) //send the event data to the server
    .then(response => dispatch(batchCreate(response.body)))
    .catch(console.error);
};

// export const loadEvent = id => (dispatch, getState) => {
//   //if it's the same event (same id), stop fetching
//   if (getState().event && getState().event.id === id) return;
//   console.log('check getState', getState());
//   superagent(`${baseUrl}/events/${id}`)
//     .then(response => dispatch(eventFetched(response.body)))
//     .catch(console.error);
// };

// export const deleteEvent = id => dispatch => {
//   superagent
//     .del(`${baseUrl}/events/${id}`)
//     .then(() => dispatch(eventDelete(id)))
//     .catch(console.err);
// };

// export const updateEvent = (id, data) => dispatch => {
//   console.log('check id and data', id, data);
//   superagent
//     .put(`${baseUrl}/events/${id}`)
//     .send(data)
//     .then(response => {
//       console.log('check response', response);
//       dispatch(eventUpdate(response.body));
//     })
//     .catch(console.error);
// };
