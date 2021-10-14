import {
  ADD_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UPVOTE_COMMENT_SUCCESS,
  UPVOTE_COMMENT_FAILURE,
} from './commentTypes';
import Http from '../../utilities/service/http';

export const addCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: comment,
  };
};

export const addCommentFailure = (error) => {
  return {
    type: ADD_COMMENT_FAILURE,
    payload: error,
  };
};

export const editCommentSuccess = (comment) => {
  return {
    type: EDIT_COMMENT_SUCCESS,
    payload: comment,
  };
};

export const editCommentFailure = (error) => {
  return {
    type: EDIT_COMMENT_FAILURE,
    payload: error,
  };
};

export const deleteCommentSuccess = (response) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: response,
  };
};

export const deleteCommentFailure = (error) => {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: error,
  };
};

export const upvoteCommentSuccess = (count) => {
  return {
    type: UPVOTE_COMMENT_SUCCESS,
    payload: count,
  };
};

export const upvoteCommentFailure = (error) => {
  return {
    type: UPVOTE_COMMENT_FAILURE,
    payload: error,
  };
};

export const upvoteComment = (commentId, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .patch('/comments/upvote/' + commentId, false, true, true, token, null)
      .then((response) => {
        const count = response.count;
        dispatch(upvoteCommentSuccess(count));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(upvoteCommentFailure(errorMessage));
      });
  };
};

export const deleteComment = (commentId, postId, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .delete(
        '/comments/delete/' + postId + '/' + commentId,
        false,
        true,
        true,
        token,
        null,
      )
      .then((response) => {
        dispatch(deleteCommentSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(deleteCommentFailure(errorMessage));
      });
  };
};

export const editComment = (commentId, formText, token) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .patch('/comments/update/' + commentId, true, true, true, token, {
        text: formText,
      })
      .then((response) => {
        dispatch(editCommentSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(editCommentFailure(errorMessage));
      });
  };
};

export const addComment = (postId, replyingTo, token, text) => {
  return (dispatch) => {
    const http = new Http();

    return http
      .post('/comments/create', true, true, true, token, {
        parentPostId: postId,
        parentCommentId: replyingTo.isPost ? 'false' : replyingTo.id,
        text: text,
      })
      .then((response) => {
        dispatch(addCommentSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(addCommentFailure(errorMessage));
      });
  };
};
