require('dotenv').config();

const authRouter = require('./routers/authRouter');
const resetRouter = require('./routers/resetPasswordRouter');
const treeRouter = require('./routers/treeRouter');
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter');
const usersRouter = require('./routers/usersRouter');
const { getEnvironmentInfo } = require('./utilities/common');

const [ENV, isProduction] = getEnvironmentInfo();
const PORT = isProduction ? process.env.PORT : process.env.BACKEND_PORT;

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app
  .use(cors())
  .use(cookieParser())
  .use(express.json())
  .use('', authRouter)
  .use('', resetRouter)
  .use('/tree', treeRouter)
  .use('/posts', postsRouter)
  .use('/comments', commentsRouter)
  .use('/users', usersRouter)
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${ENV}...`);
  });

/*
############################ Routes ############################

--------------------------- Posts -----------------------------
GET      /posts/?page=1&limit=5 => returns posts post by page and limit
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
