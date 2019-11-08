import { combineReducers } from 'redux';
import batches from './batches';
import batch from './batch';
import students from './students';
import student from './student';
import evaluations from './evaluations';
import auth from './auth';
export default combineReducers({
  batches,
  batch,
  students,
  student,
  evaluations,
  auth
});
