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

const initialState = {
  accessToken: null,
  message: '',
  loggedIn: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        accessToken: action.payload.data.accessToken,
        message: action.payload.message,
        loggedIn: action.payload.status,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        accessToken: null,
        message: '',
        loggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      console.log('LOGOUT_SUCCESS');
      return {
        ...state,
        error: null,
        accessToken: null,
        message: '',
        loggedIn: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
      };
    case REGISTER:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
