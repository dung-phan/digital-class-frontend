import { USER_LOGIN } from "../actions/login";

const token = localStorage.getItem("jwt");
const initialState = token ? token : null;
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LOGIN:
      localStorage.setItem("jwt", action.payload.jwt);
      return action.payload.jwt;
    default:
      return state;
  }
};
