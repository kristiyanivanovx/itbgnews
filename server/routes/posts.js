const express = require("express");
const router = express.Router();
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