const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { getComment, getUser } = require('../functions/getters');

//Create a comment ✔
router.post('/', async (req, res) => {
    const {parentPostId , autorId , parentCommentId, text} = req.body
    const comment = new Comment({
        parentCommentId,
        autorId,
        parentCommentId,
        text,
        creationDate: Date.now(),
        lastEditDate: Date.now(),
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});
//Adding/removing an upvote ✔
router.patch('/upvote', getComment, getUser, async (req, res) => {
    const comment = req.comment;
    const user = req.user;

    if (String(comment.authorId) === String(user._id)) {
        res.status(405).json({
            message: "You can't vote on your own comment!",
        });
    }
    //check if upvote exists
    const upvoteExists = !!(await Comment.findOne({
        comment,
        upvoters: { $elemMatch: { userId: res.user._id } },
    }));

    try {
        if (upvoteExists) {
            //remove the upvote
            await Comment.updateOne(comment, {
                $pull: { upvoters: { userId: res.user._id } },
            });

            res.status(200).json({
                count: comment.upvoters.length - 1,
                message: `removed ${user.username}`,
            });
        } else {
            //Add the upvote
            comment.upvoters.push({ userId: user._id });
            await comment.save();
            res.status(201).json({
                count: comment.upvoters.length,
                message: `added ${user.username}`,
            });
        }
    } catch (err) {
        res.status(304).json({ message: err.message });
    }
});

//Updateting a comment ✔
router.patch('/', getComment, async (req, res) => {
    const text = req.body.text
    let hasChanged = false;
    if (text) {
        req.comment.text = text
        hasChanged = true;
    }
    if (hasChanged) {
        req.comment.lastEditDate = Date.now();
    }

    try {
        if (!hasChanged){
            res.status(304).json({ message: 'Nothing was changed.' });
        }
        const updated = await res.comment.save();
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//'Deletes' a comment (does not remove it from the database) ✔
router.delete('/', getComment, getUser, async (req, res) => {
    const comment = req.comment;
    const user = req.user;

    if (String(comment.author_id) === String(user._id)) {
        try {
            comment.textContent = false;
            await comment.save();
            res.status(200).json({ message: 'comment deleted!' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
        return;
    }
    res.status(401).json({ message: 'The user does not own the comment!' });
});

module.exports = router;
