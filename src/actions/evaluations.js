import superagent from 'superagent';
import { baseUrl } from '../constants';
export const STUDENT_EVALUATED = 'STUDENT_EVALUATED';
export const STUDENT_EVALUATION_ADDED = 'STUDENT_EVALUATION_ADDED';
export const EVALUATIONS_FETCHED = 'EVALUATIONS_FETCHED';
const studentEvaluate = studentEv => ({
  type: STUDENT_EVALUATED,
  studentEv
});
const studentEvaluationAdd = evaluation => ({
  type: STUDENT_EVALUATION_ADDED,
  evaluation
});
const studentEvaluations = evaluations => ({
  type: EVALUATIONS_FETCHED,
  evaluations
});
export const evaluateStudent = (batchId, id) => dispatch => {
  console.log('what is batch id and id', batchId, id);
  superagent(`${baseUrl}/evaluations/batches/${batchId}/students/${id}`)
    .then(response => dispatch(studentEvaluate(response.body)))
    .catch(console.error);
};
export const addEvaluation = (id, color, date, remark) => dispatch => {
  console.log('what is id', id);
  superagent
    .post(`${baseUrl}/evaluations/students/${id}`)
    // .set('Authorization', `Bearer ${getState().user}`)
    .send({ color: color, date: date, remark: remark }) //send the event data to the server
    .then(() => console.log('Check what i sent', { color, date, remark }))
    .then(() => dispatch(studentEvaluationAdd({ color, date, remark })))
    .catch(console.error);
};
//load evaluations of a single batch
export const loadEvaluations = batchId => dispatch => {
  superagent(`${baseUrl}/evaluations/batches/${batchId}`)
    .then(response => dispatch(studentEvaluations(response.body)))
    .catch(console.error);
};
