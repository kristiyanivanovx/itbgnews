const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = {
    getPost: async function (req, res, next) {
        const post_id = req.params.post_id || req.body.post_id;
        let post;
        try {
            post = await Post.findById(post_id);
            if (!post || !post.textContent)
                return await res.status(404).json({
                    message: `Cannot find post with id: ${post_id}`,
                });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        res.post = post;
        next();
    },
    getUser: async function (req, res, next) {
        const user_id =
            req.params.user_id || req.body.user_id || req.body.author_id;
        let user;
        try {
            user = await User.findById(user_id);
            if (!user)
                return res.status(404).json({
                    message: `Cannot find user with id: ${user_id}`,
                });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        res.user = user;
        next();
    },
    getPost_owner_relations: async function (posts) {
        //Array of objects with atributes post, owner
        //[ { owner_username:"hekko", post={} } ]
        // [{ owner_username:"hekko", (other data) }]
        let post_owner_relations = [];
        for (var i = 0; i < posts.length; i++) {
            let post_owner = {};
            await User.findById(posts[i].author_id).then((user) => {
                post_owner.owner_username = user.username;
            });
            post_owner.post = posts[i];
            post_owner_relations.push(post_owner);
        }
        return post_owner_relations;
    },
    getComment_owner_relations: async function (comments) {
        let nestedComments = (current_comment_branch) => {};
        let root = (root_comment_branch) => {
            for (var i = 0; i < root_comment_branch.length; i++) {}
        };

        //Array of objects with atributes comment, owner
        //[ { owner_username:"hekko", comment={} } ]
        let comment_owner_relations = [];
        for (var i = 0; i < comments.length; i++) {
            let comment_owner = {};

            await User.findById(comments[i].author_id).then((user) => {
                comment_owner.owner_username = user.username;
            });
            comment_owner.comment = comments[i];
            comment_owner_relations.push(comment_owner);
        }
        return comment_owner_relations;
    },
    getComment: async function (req, res, next) {
        const comment_id = req.params.comment_id || req.body.comment_id;
        let comment;
        try {
            comment = await Comment.findById(comment_id);
            if (!comment || !comment.textContent)
                return res.status(404).json({
                    message: `Cannot find comment with id: ${comment_id}`,
                });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        res.comment = comment;
        next();
    },
    getComments: async function (res) {
        return await Comment.find({
            parent_post_id: res.post._id,
            textContent: true,
        }).lean();
    },
};
