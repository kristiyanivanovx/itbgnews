export const initialState = 0;

export const COMMENT_ACTIONS = {
  UPVOTE: 'upvote',
  EDIT: 'edit',
  DELETE: 'delete',
};

const commentsReducer = (state, action) => {
  const { commentId, token, ENDPOINT } = action.payload;
  const target = ENDPOINT + '/comments/upvote/' + commentId;
  let result = 0;

  switch (action.type) {
    case COMMENT_ACTIONS.UPVOTE:
      fetch(target, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          const { count } = data;
          console.log('my count ' + count);
          result = count;
        });

      console.log('result in fetch is ... ' + result);
      return { ...state, firstCounter: result };
    case COMMENT_ACTIONS.EDIT:
      return state;
    case COMMENT_ACTIONS.DELETE:
      return state;
    default:
      return state;
  }
};

export default commentsReducer;
