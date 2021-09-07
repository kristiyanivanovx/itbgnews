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
GET      /posts/?id={id} => returns the post and comments of post with id
POST     /posts => adding a post req.body must have (text && url)
PATCH    /posts/?id={id} => updating a post req.body must have (text || url)
DELETE   /posts/?id={id} => deletes a post post by id (does not remove it from the server)

--------------------------- Comments --------------------------
POST     /comment => adding a comment to a post, req.body must have 
                    (parent_post_id && author_id && parent_comment_id && text)
PATCH    /posts/?id={id} => updating a comment req.body must have (text)
DELETE   /posts/?id={id} => deletes a comment by id (does not remove it from the server)
*/

/*
######################### ERROR STATUS #########################
400 - User gave wrong(bad) data.
201 - Succsessfully created an object
404 - Object not found
500 - Serverside problem
*/
