import { combineReducers } from "redux";
import { USER_LOGOUT } from "../actions/signout";
import batches from "./batches";
import batch from "./batch";
import students from "./students";
import student from "./student";
import evaluations from "./evaluations";
import auth from "./auth";
const appReducer = combineReducers({
  batches,
  batch,
  students,
  student,
  evaluations,
  auth
});
const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
