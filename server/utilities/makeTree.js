function makeTree(flatArrayOfComments){
    console.log(flatArrayOfComments)
    const commentMap = flatArrayOfComments.reduce(
        (state, comment) => ({
            ...state,
            [comment._id]: comment,
        }),
        {},
    );
    console.log()
    const commentTree = flatArrayOfComments.reduce((state, comment) => {
        if (comment.parentCommentId !== "false") {
            const parentComment = commentMap[comment.parentCommentId];
            const oldChildren = parentComment.children ?? [];
            parentComment.children = [...oldChildren, comment];
            return state;
        }

        return [...state, comment];
    }, []);
    return commentTree
}




module.exports = {
    makeTree
}