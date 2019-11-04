import superagent from 'superagent';
import { baseUrl } from '../constants';
export const USER_SIGNUP = 'USER_SIGNUP';

const userSignup = () => ({
  type: USER_SIGNUP
});

export const signup = (email, password) => dispatch => {
  superagent
    .post(`${baseUrl}/signup`)
    .send({ email, password })
    .then(() => {
      dispatch(userSignup());
    })
    .catch(console.error);
};
