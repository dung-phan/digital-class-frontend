import { USER_LOGIN } from '../actions/login';

export default (state = '', action = {}) => {
  console.log('check reducer state', state);
  console.log('check action', action);
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    default:
      return state;
  }
};
