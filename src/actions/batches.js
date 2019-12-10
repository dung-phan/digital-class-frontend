import superagent from "superagent";
import { baseUrl } from "../constants";
export const BATCHES_FETCHED = "BATCHES_FETCHED";
export const BATCH_CREATED = "BATCH_CREATED";
export const BATCH_FETCHED = "BATCH_FETCHED";

const batchesFetched = batches => ({
  type: BATCHES_FETCHED,
  batches
});
const batchCreate = batch => ({
  type: BATCH_CREATED,
  batch
});
const batchFetched = batch => ({
  type: BATCH_FETCHED,
  batch
});

//dispatch action to loadEvent with thunk
export const loadBatches = () => dispatch => {
  superagent(`${baseUrl}/batches`)
    .then(response => dispatch(batchesFetched(response.body)))
    .catch(console.error);
};

export const createBatch = batch => (dispatch, getState) => {
  const token = getState().auth;
  superagent
    .post(`${baseUrl}/batches`)
    // .set('Authorization', `Bearer ${token}`)
    .send(batch) //send the event data to the server
    .then(response => dispatch(batchCreate(response.body)))
    .catch(console.error);
};

export const loadBatch = id => (dispatch, getState) => {
  const token = getState().auth;

  superagent(`${baseUrl}/batches/${id}`)
    // .set("Authorization", `Bearer ${token}`)
    .then(response => dispatch(batchFetched(response.body)))
    .catch(console.error);
};
