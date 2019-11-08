import superagent from 'superagent';
import { baseUrl } from '../constants';
export const USER_LOGOUT = 'USER_LOGOUT';

const userLogOut = () => ({
  type: USER_LOGOUT
});

export const logout = (user, cookies) => dispatch => {
  superagent
    .delete(`${baseUrl}/logout`)
    .send(user, cookies)
    .then(() => {
      dispatch(userLogOut());
    })
    .catch(console.error);
};
