import {
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
} from './commentTypes';

const initialState = {
  numberOfComments: 5,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        numberOfComments: state.numberOfComments - 1,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
        error: '',
      };
    case EDIT_COMMENT:
      return {
        ...state,
        numberOfComments: state.numberOfComments + 1,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
        error: '',
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        comment: null,
        error: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    case UPVOTE_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default commentReducer;
