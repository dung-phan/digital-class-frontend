import {
  STUDENTS_FETCHED,
  STUDENT_ADDED,
  STUDENT_DELETED
} from "../actions/students";

export default (state = [], action = {}) => {
  console.log("what is action", action);
  switch (action.type) {
    case STUDENTS_FETCHED:
      return action.students;
    case STUDENT_ADDED:
      return [...state, action.student];
    case STUDENT_DELETED:
      console.log("check reducer state", state);
      console.log("check action", action);
      return state.filter(student => student.id !== action.studentId);

    default:
      return state;
  }
};
