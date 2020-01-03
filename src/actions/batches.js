import superagent from "superagent";
import { baseUrl } from "../constants";
export const BATCHES_FETCHED = "BATCHES_FETCHED";
export const BATCH_CREATED = "BATCH_CREATED";
export const BATCH_FETCHED = "BATCH_FETCHED";
export const BATCH_EDITED = "BATCH_EDITED";
export const BATCH_DELETED = "BATCH_DELETED";

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
const batchEdit = batchId => ({
  type: BATCH_EDITED,
  batchId
});
const batchDelete = batchId => ({
  type: BATCH_DELETED,
  batchId
});

export const loadBatches = () => dispatch => {
  superagent(`${baseUrl}/batches`)
    .then(response => dispatch(batchesFetched(response.body)))
    .catch(console.error);
};

export const createBatch = batch => dispatch => {
  superagent
    .post(`${baseUrl}/batches`)
    .send(batch)
    .then(() => dispatch(batchCreate(batch)))
    .catch(console.error);
};

export const loadBatch = id => dispatch => {
  superagent(`${baseUrl}/batches/${id}`)
    .then(response => dispatch(batchFetched(response.body)))
    .catch(console.error);
};

export const editBatch = (batchId, batch) => (dispatch, getState) => {
  const token = getState().auth;
  superagent
    .put(`${baseUrl}/batches/${batchId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(batch)
    .then(() => dispatch(batchEdit(batch)))
    .catch(console.error);
};
export const deleteBatch = batchId => (dispatch, getState) => {
  //const token = getState().auth;
  superagent
    .del(`${baseUrl}/batches/${batchId}`)
    //.set("Authorization", `Bearer ${token}`)
    .then(() => dispatch(batchDelete(batchId)))
    .catch(console.err);
};
