import superagent from "superagent";
import { baseUrl } from "../constants";
export const STUDENTS_FETCHED = "STUDENTS_FETCHED";
export const STUDENT_FETCHED = "STUDENT_FETCHED";
export const STUDENT_ADDED = "STUDENT_ADDED";
export const STUDENT_EDITED = "STUDENT_EDITED";
export const STUDENT_DELETED = "STUDENT_DELETED";

const studentsFetched = students => ({
  type: STUDENTS_FETCHED,
  students
});
const studentFetched = student => ({
  type: STUDENT_FETCHED,
  student
});
const studentAdd = student => ({
  type: STUDENT_ADDED,
  student
});
const studentEdit = student => ({
  type: STUDENT_EDITED,
  student
});
const studentDelete = studentId => ({
  type: STUDENT_DELETED,
  studentId
});

export const loadStudents = batchId => dispatch => {
  superagent(`${baseUrl}/batches/${batchId}/students`)
    .then(response => dispatch(studentsFetched(response.body)))
    .catch(console.error);
};
export const loadStudent = (batchId, studentId) => dispatch => {
  superagent(`${baseUrl}/batches/${batchId}/students/${studentId}`)
    .then(response => dispatch(studentFetched(response.body)))
    .catch(console.error);
};
export const addStudent = (batchId, student) => (dispatch, getState) => {
  superagent
    .post(`${baseUrl}/batches/${batchId}/students`)
    .send(student)
    .then(res => dispatch(studentAdd(res.body)))
    .catch(console.error);
};
export const editStudent = (batchId, studentId, student) => dispatch => {
  superagent
    .put(`${baseUrl}/batches/${batchId}/students/${studentId}`)
    .send({ student })
    .then(() => dispatch(studentEdit(student)))
    .catch(console.error);
};
export const deleteStudent = (batchId, id) => dispatch => {
  superagent
    .del(`${baseUrl}/batches/${batchId}/students/${id}`)
    .then(() => dispatch(studentDelete(id)))
    .catch(console.err);
};
