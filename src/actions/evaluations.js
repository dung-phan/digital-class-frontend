import superagent from "superagent";
import { baseUrl } from "../constants";
export const STUDENT_EVALUATED = "STUDENT_EVALUATED";
export const STUDENT_EVALUATION_ADDED = "STUDENT_EVALUATION_ADDED";
export const EVALUATIONS_FETCHED = "EVALUATIONS_FETCHED";
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
  superagent(`${baseUrl}/batches/${batchId}/students/${id}/evaluations`)
    .then(response => dispatch(studentEvaluate(response.body)))
    .catch(console.error);
};
export const addEvaluation = (batchId, id, color, date, remark) => dispatch => {
  superagent
    .post(`${baseUrl}/batches/${batchId}/students/${id}/evaluations`)
    // .set('Authorization', `Bearer ${getState().user}`)
    .send({ color: color, date: date, remark: remark })
    .then(() => dispatch(studentEvaluationAdd({ color, date, remark })))
    .catch(console.error);
};
//load evaluations of a single batch
export const loadEvaluations = batchId => dispatch => {
  superagent(`${baseUrl}/batches/${batchId}/evaluations`)
    .then(response => dispatch(studentEvaluations(response.body)))
    .catch(console.error);
};
