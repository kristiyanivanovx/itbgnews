const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = {
    getPost: async function (req, res, next) {
        let post;
        try {
            post = await Post.findById(req.body.postId);
            if (!post || !post.textContent) {
                return await res.status(404).json({
                    message: `Cannot find post with id: ${req.body.postId}`,
                });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        res.post = post;
        next();
    },
    getUser: async function (req, res, next) {
        let user;
        try {
            user = await User.findById(req.body.userId);
            if (!user){
                return res.status(404).json({
                    message: `Cannot find user with id: ${req.body.postId}`,
                });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        res.user = user;
        next();
    },

    getComment: async function (req, res, next) {
        let comment;
        try {
            comment = await Comment.findById(req.body.commentId);
            if (!comment || !comment.textContent){
                return res.status(404).json({
                    message: `Cannot find comment with id: ${req.body.commentId}`,
                });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        res.comment = comment;
        next();
    },
    getComments: async function (req) {
        const comment = await Comment.find({
            parentPostId: req.postId,
            textContent: true,
        });
        return comment;
    },
};
