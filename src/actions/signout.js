export const USER_LOGOUT = "USER_LOGOUT";

export const logout = () => dispatch => {
  return dispatch({ type: USER_LOGOUT });
};
