import { USER_LOGIN } from '../actions/login';
import { USER_LOGOUT } from '../actions/logout';

const token = localStorage.getItem('jwt');
const initialState = token ? token : null;
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LOGIN:
      localStorage.setItem('jwt', action.payload.jwt);
      return action.payload.jwt;
    case USER_LOGOUT:
      return action;
    default:
      return state;
  }
};
