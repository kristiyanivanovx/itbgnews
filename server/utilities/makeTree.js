function makeTree(flatArrayOfComments){
    const commentMap = flatArrayOfComments.reduce(
        (state, comment) => ({
            ...state,
            [comment._id]: comment,
        }),
        {},
    );
    const commentTree = flatArrayOfComments.reduce((state, comment) => {
        if (comment.parentCommentId !== "false") {
            const parentComment = commentMap[comment.parentCommentId];

            const oldChildren = parentComment.children ?? [];
            console.log(oldChildren || 1)
            parentComment.children = [...oldChildren, comment];
            console.log(parentComment)
            return state;
        }

        return [...state, comment];
    }, []);
    return commentTree
}


module.exports = {
    makeTree
}
