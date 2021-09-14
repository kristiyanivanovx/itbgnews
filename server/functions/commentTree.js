module.exports = function(comments) {
    comments = JSON.parse(JSON.stringify(comments));
      const commentMap = comments.reduce(
        (state, comment) => ({
          ...state,
          [comment._id]: comment,
        }),
        {},
      );
      const commentTree = comments.reduce((state, comment) => {
        if (comment.parent_comment_id) {
          const parentComment = commentMap[comment.parent_comment_id];
      
          const oldChildren = parentComment.children ?? [];
          parentComment.children = [...oldChildren, comment];
          return state;
        }
        return [...state, comment];
      }, []);
      //console.log(commentTree)
      //console.dir(commentTree, { depth: null });
      return commentTree;
}