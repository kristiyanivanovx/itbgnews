function makeTree(flatArrayOfComments){
    const commentMap = flatArrayOfComments.reduce(
        (state, comment) => ({
            ...state,
            [comment._id]: comment,
        }),
        {},
    );
    const commentTree = comments.reduce((state, comment) => {
        if (comment.parentId) {
            const parentComment = commentMap[comment.parentId];

            const oldChildren = parentComment.children ?? [];
            parentComment.children = [...oldChildren, comment];

            return state;
        }

        return [...state, comment];
    }, []);
    return commentTree
}


module.export = {
    makeTree
}
