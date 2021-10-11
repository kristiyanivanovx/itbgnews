import {
  ADD_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from './commentTypes';
import axios from 'axios';
import ensureValidCookie from '../../../utilities/ensureValidCookie';
import { getEndpoint } from '../../../utilities/common';
import { error } from 'next/dist/build/output/log';

export const addComment = () => {
  return {
    type: ADD_COMMENT,
  };
};

export const addCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: comment,
  };
};

export const addCommentFailure = (comment) => {
  return {
    type: ADD_COMMENT_FAILURE,
    payload: comment,
  };
};

export const editComment = () => {
  return {
    type: EDIT_COMMENT,
  };
};

export const editCommentSuccess = () => {
  return {
    type: EDIT_COMMENT_SUCCESS,
  };
};

export const editCommentFailure = (error) => {
  return {
    type: EDIT_COMMENT_FAILURE,
    payload: error,
  };
};

export const deleteComment = () => {
  return {
    type: DELETE_COMMENT,
  };
};

export const upvoteComment = () => {
  return {
    type: UPVOTE_COMMENT,
  };
};

export const fetchCommentCreate = async (
  postId,
  replyingTo,
  accessToken,
  text,
) => {
  return async (dispatch) => {
    const target = getEndpoint() + '/comments/create';

    console.log('da');
    // let options = {
    //   url: target,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${async () =>
    //       await ensureValidCookie(accessToken)}`,
    //   },
    //   body: JSON.stringify({
    //     parentPostId: postId,
    //     parentCommentId: replyingTo.isPost ? 'false' : replyingTo.id,
    //     text: text,
    //   }),
    // };

    axios
      .post(target, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
        },
        body: JSON.stringify({
          parentPostId: postId,
          parentCommentId: replyingTo.isPost ? 'false' : replyingTo.id,
          text: text,
        }),
      })
      .then(function (response) {
        console.log('dispatch !!');
        const comment = response.data;
        dispatch(addCommentSuccess(comment));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(addCommentFailure(errorMessage));
        // console.error(error);
      });
  };
};
