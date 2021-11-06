import {
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAILURE,
} from './commentTypes';

const initialState = {
  comment: '',
  message: '',
  count: -9,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        error: '',
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        error: '',
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        comment: null,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case UPVOTE_COMMENT:
      return {
        ...state,
        count: action.payload,
      };
    case UPVOTE_COMMENT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      };
    case UPVOTE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
