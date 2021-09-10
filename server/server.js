require('dotenv').config();

const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const ENV = process.env.NODE_ENV;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const resetRoutes = require('./routes/resetPassword');
const authRoutes = require('./routes/authRoute');

app.use('', authRoutes);
app.use('', resetRoutes);

const articlesRouter = require('./Routes/posts');
const commentRouter = require('./Routes/comments');

app.use('/posts', articlesRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${ENV}...`);
});

/*
############################ Routes ############################

--------------------------- Posts -----------------------------
GET      /posts => returns posts post by page and limit
GET      /posts/comments => returns the post and comments of post with id req.body must have (post_id)
POST     /posts => creating a post req.body must have (text && url)
PATCH    /posts => updating a post req.body must have (post_id && (text || url))
DELETE   /posts/ => deletes a post post by id req.body must have (post_id && user_id) (does not remove it from the server)
PATCH    /posts/upvote => adds/removes an upvote req.body must have (post_id && user_id)

--------------------------- Comments --------------------------
POST     /comments => creating a comment to a post, req.body must have
                    (parent_post_id && author_id && (parent_comment_id || null) && text)
PATCH    /comments => updating a comment req.body must have (comment_id && text)
DELETE   /comments => deletes a comment by id req.body must have(comment_id) (does not remove it from the server)
PATCH    /comments/upvote => adds/removes an upvote req.body must have (comment_id && user_id)
*/

/*
######################### ERROR STATUS #########################
400 - User gave wrong(bad) data.
201 - Succsessfully created an object
200 - Everything was Succsessful
404 - Object not found
500 - Serverside problem
304 - Not Modified
405 - Method not allowed
*/
