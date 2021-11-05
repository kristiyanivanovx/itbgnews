import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from './authTypes';
import Http from '../../utilities/http';

export const login = (email, password) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .post('/login', true, false, true, null, {
        email,
        password,
      })
      .then((response) => {
        response.errorMessage
          ? dispatch(loginFailure(response.errorMessage))
          : dispatch(loginSuccess(response));
      })
      .catch((error) => {
        console.log('the error is ...' + error);
        const errorMessage = error.message;
        dispatch(loginFailure(errorMessage));
      });
  };
};

export const loginSuccess = (response) => {
  return {
    type: LOGIN_SUCCESS,
    payload: response,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logout = (token) => {
  return (dispatch) => {
    const http = new Http();

    // nb: order here matters
    return Promise.all([
      http.post('/logout', false, true, true, token, null),
      http.post('/api/removeCookie', true, false, false, token, null),
    ])
      .then((responses) => {
        let firstResponse = responses[0];
        let secondResponse = responses[1];
        let isLogoutSuccessful = firstResponse.status && secondResponse.success;

        isLogoutSuccessful
          ? dispatch(logoutSuccess(isLogoutSuccessful))
          : dispatch(logoutFailure({ ...responses }));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(loginFailure(errorMessage));
      });
  };
};

export const logoutSuccess = (isLoggedOut) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: isLoggedOut,
  };
};

export const logoutFailure = (error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
};

// todo: implement
export const register = (user) => {
  return {
    type: REGISTER,
    payload: user,
  };
};

export const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};
