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

// todo: fix bug where on upvote the count is -9 but not the actual one
const initialState = {
  comment: '',
  message: '',
  text: '',
  count: -999,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
        error: '',
      };
    case EDIT_COMMENT:
      console.log('EDIT_COMMENT (in reducer)');
      return {
        ...state,
        comment: action.payload,
      };
    case EDIT_COMMENT_SUCCESS:
      console.log('EDIT_COMMENT_SUCCESS (in reducer)');
      console.log({
        // ...state,
        loading: false,
        comment: action.payload,
        text: action.payload.text,
        error: '',
      });
      return {
        // ...state,
        loading: false,
        comment: action.payload,
        text: action.payload.text,
        error: '',
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case UPVOTE_COMMENT:
      console.log('UPVOTE_COMMENT: ' + action.payload);
      return {
        ...state,
        count: action.payload,
      };
    case UPVOTE_COMMENT_SUCCESS:
      console.log('UPVOTE_COMMENT_SUCCESS (in reducer)' + action.payload);
      console.log({
        ...state,
        count: action.payload,
      });

      return {
        ...state,
        count: action.payload,
      };
    case UPVOTE_COMMENT_FAILURE:
      console.log('UPVOTE_COMMENT_FAILURE (in reducer)' + action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      console.log('Default state...');
      console.log(state);
      return state;
  }
};

export default commentReducer;
