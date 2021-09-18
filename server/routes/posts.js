const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const ConvertToTree = require('../functions/commentTree');
const { getPost, getUser, getComments } = require('../functions/getters');

/*
const getters = require("../functions/getters")
const controllers = require("../controllers/postControllers")
//Getting all Posts by page ✔
router.get("/", controllers.getPost);
//Getting comments and post by post id ✔
router.get("/comments", getters.postGetter, controllers.getComments);
//Creating a Post ✔
router.post("/", controllers.postPost);
//Updateting a Post ✔
router.patch("/", getters.postGetter, controllers.patchPost);

//Voting on a post ✔
router.patch("/upvote", getters.userGetter, getters.postGetter, controllers.vote);

//'Deletes' a Post (does not remove it from the database) ✔
// router.delete("/", getters.getPost, getters.getUser, controllers.deletePost);
module.exports = router;
*/

//Getting all Posts by page ✔
router.get('/', async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
        const Posts = await Post.find({ textContent: true });
        const posts_page = Posts.slice(startIndex, endIndex);

        //const post_owner_relations = await getPost_owner_relations(posts_page);
        //console.log(posts_owner)
        res.status(200).json(posts_page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Getting comments and post by post id ✔
router.get('/:post_id', getPost, async (req, res) => {
    try {
        let comments = await getComments(res);

        let commentTree = ConvertToTree(comments);
        //Seems too slow (sending req for each comment to determine its author username)
        //Replaced it with just storing autohrUsername on each comment
        //commentTree = await getComment_owner_relations(commentTree);

        res.status(200).json({ post: res.post, commentTree });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Creating a Post ✔
router.post('/', getUser, async (req, res) => {
    const post = new Post({
        text: req.body.text,
        url: req.body.url,
        author_id: req.body.user_id,
        authorUsername: res.user.username,
        last_edit_date: Date.now(),
        creation_date: Date.now(),
    });
    try {
        if (!post.text) {
            res.status(400).json({
                message: 'User gave empty input on text attribute!',
            });
            return;
        }
        if (!post.url) {
            res.status(400).json({
                message: 'User gave empty input on url attribute!',
            });
            return;
        }

        res.user.postCount += 1;

        await post.save();
        await res.user.save();

        res.status(201).json({ message: 'New post created!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//Updateting a Post ✔
router.patch('/:post_id', getPost, async (req, res) => {
    let hasChanged = false;
    if (req.body.text) {
        res.post.text = req.body.text;
        hasChanged = true;
    }
    if (req.body.url) {
        res.post.url = req.body.url;
        hasChanged = true;
    }
    if (hasChanged) res.post.last_edit_date = Date.now();

    try {
        if (!hasChanged) {
            res.status(400).json({ message: 'Nothing was changed.' });
            return;
        }
        const updated = await res.post.save();
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Voting on a post ✔
router.post('/upvote', getPost, getUser, async (req, res) => {
    const post = res.post;
    const user = res.user;

    //check if upvote exists
    const upvoteExists = !!(await Post.findOne({
        _id: post._id,
        upvoters: { $elemMatch: { user_id: user._id } },
    }));

    try {
        if (upvoteExists) {
            //remove the upvote
            await Post.updateOne(post, {
                $pull: { upvoters: { user_id: user._id } },
            });

            res.user.commitedLikes -= 1;
            user.save();

            res.status(200).json({
                count: post.upvoters.length - 1,
                message: `removed ${user.username}`,
            });
        } else {
            //Add the upvote
            post.upvoters.push({ user_id: user._id });
            res.user.commitedLikes += 1;

            post.save();
            user.save();

            res.status(201).json({
                count: post.upvoters.length,
                message: `added ${user.username}`,
            });
        }
    } catch (err) {
        res.status(304).json({ message: err.message });
    }

});

//'Deletes' a Post (does not remove it from the database) ✔
router.delete('/:user_id/:post_id', getPost, getUser, async (req, res) => {
    const post = res.post;
    const user = res.user;

    if (String(post.author_id) === String(user._id)) {
        try {
            post.textContent = false;
            user.postCount -= 1;
            await post.save();
            await user.save();
            res.status(200).json({ message: 'post deleted!' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
        return;
    }
    res.status(401).json({ message: 'The user does not own the post!' });
});

module.exports = router;
