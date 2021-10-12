import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../redux';
import { deleteComment } from '../../../server/controllers/commentsController';

function CommentContainer() {
  const numberOfComments = useSelector((state) => state.comment.numberOfCakes);
  const commentDispatch = useDispatch();

  return (
    <div>
      <h2>number of comments {numberOfComments}</h2>
      {/*<button onClick={() => commentDispatch(addComment())}>add comment</button>*/}
      <button onClick={() => commentDispatch(deleteComment())}>
        delete comment
      </button>
    </div>
  );
}

// all this is possible due to the connect function, it connects our component to the store
export default CommentContainer;
