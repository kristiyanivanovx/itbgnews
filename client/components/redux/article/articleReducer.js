import {
  CREATE_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  UPVOTE_ARTICLE,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILURE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  UPVOTE_ARTICLE_SUCCESS,
  UPVOTE_ARTICLE_FAILURE,
} from './articleTypes';
import { act } from 'react-dom/test-utils';

const initialState = {
  article: null,
  errors: null,
  message: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case CREATE_ARTICLE_SUCCESS:
      // console.log('CREATE_ARTICLE_SUCCESS action.payload');
      // console.log(action.payload);

      const { errorTitle, errorUrl } = action.payload;
      return {
        ...state,
        errors: { errorTitle, errorUrl },
        article: action.payload,
      };
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case EDIT_ARTICLE:
      console.log('in EDIT_ARTICLE ?');
      return {
        ...state,
        article: action.payload,
      };
    case EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
      };
    case EDIT_ARTICLE_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case UPVOTE_ARTICLE:
      return {
        ...state,
      };
    case UPVOTE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
      };
    case UPVOTE_ARTICLE_FAILURE:
      return {
        ...state,
        // errors: action.payload,
      };
    case DELETE_ARTICLE:
      console.log('in DELETE_ARTICLE ?');
      return {
        ...state,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
      };
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        // errors: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
