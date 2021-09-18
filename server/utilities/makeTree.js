function makeTree(flatArrayOfComments) {
  const commentMap = flatArrayOfComments.reduce(
    (state, comment) => ({
      ...state,
      [comment._id]: comment,
    }),
    {},
  );

  return flatArrayOfComments.reduce((state, comment) => {
    if (comment.parentCommentId !== 'false') {
      const parentComment = commentMap[comment.parentCommentId];
      const oldChildren = parentComment.children ?? [];
      parentComment.children = [...oldChildren, comment];
      return state;
    }

    return [...state, comment];
  }, []);
}

module.exports = {
  makeTree,
};
