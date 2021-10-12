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
  UPVOTE_ARTICLE_SUCCESS,
  UPVOTE_ARTICLE_FAILURE,
} from './articleTypes';
import { getEndpoint } from '../../../utilities/common';

export const createArticle = (text, url, userId, token) => {
  return (dispatch) => {
    const target = getEndpoint() + '/posts/create';

    return fetch(target, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, url, authorId: userId }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(createArticleSuccess(response));
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

export const upvoteArticle = (postId, accessToken) => {
  return (dispatch) => {
    const target = getEndpoint() + '/posts/upvote/' + postId;

    return fetch(target, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
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

export const upvoteArticleSuccess = (article) => {
  return {
    type: UPVOTE_ARTICLE_SUCCESS,
    payload: article,
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
    const target = getEndpoint() + '/posts/update/' + postId;

    return fetch(target, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: formText, url: formUrl }),
    })
      .then((response) => response.json())
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
    const target = getEndpoint() + '/posts/delete/' + postId;

    return fetch(target, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
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
