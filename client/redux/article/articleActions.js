import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILURE,
  DELETE_ARTICLE_SUCCESS,
  UPVOTE_ARTICLE_SUCCESS,
  UPVOTE_ARTICLE_FAILURE,
} from './articleTypes';
import Http from '../../utilities/service/http';

export const createArticle = (text, url, userId, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .post('/posts/create', true, true, true, token, {
        text,
        url,
        authorId: userId,
      })
      .then((response) => {
        console.log(response);

        const hasErrors = !response?.errorTitle || !response?.errorText;

        hasErrors
          ? dispatch(createArticleFailure(response))
          : dispatch(createArticleSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(createArticleFailure(errorMessage));
      });
  };
};

export const createArticleSuccess = (article) => {
  return {
    type: CREATE_ARTICLE_SUCCESS,
    payload: article,
  };
};

export const createArticleFailure = (error) => {
  return {
    type: CREATE_ARTICLE_FAILURE,
    payload: error,
  };
};

export const upvoteArticle = (postId, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .patch('/posts/upvote/' + postId, false, true, true, token, null)
      .then((response) => {
        console.log(response);
        dispatch(upvoteArticleSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(upvoteArticleFailure(errorMessage));
      });
  };
};

export const upvoteArticleSuccess = (result) => {
  return {
    type: UPVOTE_ARTICLE_SUCCESS,
    payload: result,
  };
};

export const upvoteArticleFailure = (error) => {
  return {
    type: UPVOTE_ARTICLE_FAILURE,
    payload: error,
  };
};

export const editArticle = (postId, formText, formUrl, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .patch('/posts/update/' + postId, true, true, true, token, {
        text: formText,
        url: formUrl,
      })
      .then((response) => {
        dispatch(editArticleSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(editArticleFailure(errorMessage));
      });
  };
};

export const editArticleSuccess = (article) => {
  return {
    type: EDIT_ARTICLE_SUCCESS,
    payload: article,
  };
};

export const editArticleFailure = (error) => {
  return {
    type: EDIT_ARTICLE_FAILURE,
    payload: error,
  };
};

export const deleteArticle = (postId, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .delete('/posts/delete/' + postId, false, true, true, token, null)
      .then((response) => {
        console.log('response in deleteArticle function');
        console.log(response);
        dispatch(deleteArticleSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(deleteArticleFailure(errorMessage));
      });
  };
};

export const deleteArticleSuccess = (article) => {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    payload: article,
  };
};

export const deleteArticleFailure = (error) => {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    payload: error,
  };
};
