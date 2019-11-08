import {
  EVALUATIONS_FETCHED,
  STUDENT_EVALUATED,
  STUDENT_EVALUATION_ADDED
} from '../actions/evaluations';

export default (state = [], action = {}) => {
  switch (action.type) {
    case EVALUATIONS_FETCHED:
      return action.evaluations;
    case STUDENT_EVALUATED:
      return action.studentEv;
    case STUDENT_EVALUATION_ADDED:
      return [...state, action.evaluation];
    default:
      return state;
  }
};
