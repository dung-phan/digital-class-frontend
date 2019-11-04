import { combineReducers } from 'redux';
import batches from './batches';
import auth from './auth';
export default combineReducers({
  batches,
  auth
});
