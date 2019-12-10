import superagent from "superagent";
import { baseUrl } from "../constants";
export const USER_LOGIN = "USER_LOGIN";

const userLogIn = (userId, jwt) => ({
  type: USER_LOGIN,
  payload: { userId, jwt }
});

export const login = (email, password) => dispatch => {
  superagent
    .post(`${baseUrl}/login`)
    .send({ email, password })
    .then(response => {
      const { userId, jwt } = response.body;
      dispatch(userLogIn(userId, jwt));
    })
    .catch(console.error);
};
