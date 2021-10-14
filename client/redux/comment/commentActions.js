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
import getEndpoint from '../../utilities/infrastructure/getEndpoint';

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
  console.log('upvoteCommentSuccess (in action): ' + count);
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

export const upvoteComment = (commentId, accessToken) => {
  return (dispatch) => {
    const target = getEndpoint() + '/comments/upvote/' + commentId;

    return fetch(target, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const count = response.count;
        console.log('upvoteComment...2: ' + count);

        dispatch(upvoteCommentSuccess(count));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(upvoteCommentFailure(errorMessage));
      });
  };
};

export const deleteComment = (commentId, postId, accessToken) => {
  return (dispatch) => {
    const target =
      getEndpoint() + '/comments/delete/' + postId + '/' + commentId;

    return fetch(target, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteCommentSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(deleteCommentFailure(errorMessage));
      });
  };
};

export const editComment = (commentId, formText, accessToken) => {
  return (dispatch) => {
    const target = getEndpoint() + '/comments/update/' + commentId;

    return fetch(target, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ text: formText }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('edit comment response');
        console.log(response);
        dispatch(editCommentSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(editCommentFailure(errorMessage));
      });
  };
};

export const addComment = (postId, replyingTo, accessToken, text) => {
  return (dispatch) => {
    const target = getEndpoint() + '/comments/create';

    return fetch(target, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        parentPostId: postId,
        parentCommentId: replyingTo.isPost ? 'false' : replyingTo.id,
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(addCommentSuccess(response));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(addCommentFailure(errorMessage));
      });
  };
};
