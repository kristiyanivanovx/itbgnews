require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});

db.once("open", () => {
  console.log("Connected to DB");
});
app.use(cors());
app.use(express.json());

const articlesRouter = require("./Routes/posts");
const commentRouter = require("./Routes/comments");
app.use("/posts", articlesRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`server has started on port: ${process.env.PORT}`);
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
