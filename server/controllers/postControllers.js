const getters = require("../functions/getters")
const Post = require("../models/post")


async function getPost(req, res)  {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
        const posts = await post.find({textContent: true});
        const postPage = posts.slice(startIndex, endIndex);
        res.json(postPage);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


async function getComments (req, res) {
    try {
        let comments = await getters.commentsGetter(req);
        res.status(200).json({post: res.post, comments});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


async function postPost(req, res)  {
    const {text, url, authorId} = req.body
    const newPost = new post({
        text, url, authorId,
        lastEditDate: Date.now(),
        creationDate: Date.now(),
    });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}


async function patchPost(req, res) {
    // todo make validation on url if exists
    const {text, url} = req.body
    let hasChanged = false;
    if (text) {
        req.post.url = text
        hasChanged = true;
    }
    if (url) {
        req.post.url = url
        hasChanged = true;
    }
    if (hasChanged) req.post.lastEditDate = Date.now();
    try {
        if (!hasChanged) res.status(400).json({message: "Nothing was changed."});

        const updated = await res.post.save();
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function vote(req, res) {
    const post = req.post;
    const user = req.user;

    if (String(post.authorId) === String(user._id)) {
        res.status(405).json({message: "You can't vote on your own post!"});
    }

    //check if upvote exists
    let upvoteExists = !!(await Post.findOne({
        post,
        upvoters: {$elemMatch: {userId: user._id}},
    }));
    try {
        // Here is checked if a vote is deleted but is not actually deleted from database
        if (upvoteExists) {
            //remove the upvote
            Post.updateOne(post, {
                $pull: {upvoters: {userId: user._id}},
            }, (err , d) => {
                if (err) throw err
            });
            post.save()
            res.status(200).json({
                count: post.upvoters.length - 1,
                message: `removed ${user.username}`,
            });
        } else {
            //Add the upvote
            post.upvoters.push({userId: user._id});
            post.save();
            res.status(201).json({
                count: post.upvoters.length + 1,
                message: `added ${user.username}`,
            });
        }
    } catch (err) {
        res.status(304).json({message: err.message});
    }
}

async function deletePost(req, res)  {
    const post = req.post;
    const user = req.user;

    if (String(post.author_id) === String(user._id)) {
        try {
            await post.delete();
            res.status(200).json({message: "post deleted!"});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
        return;
    }
    res.status(401).json({message: "The user does not own the post!"});
}




module.exports = {
    getPost,
    getComments,
    postPost,
    patchPost,
    vote,
    deletePost
}
