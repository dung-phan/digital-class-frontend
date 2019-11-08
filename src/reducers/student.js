import { STUDENT_FETCHED, STUDENT_EDITED } from '../actions/students';

export default (state = [], action = {}) => {
  switch (action.type) {
    case STUDENT_FETCHED:
      return action.student;
    case STUDENT_EDITED:
      return action.student;
    default:
      return state;
  }
};
