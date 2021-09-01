const { response } = require("express");
const express = require("express");
const article = require("../models/article");
const router = express.Router();
const Article = require("../models/article");
const Comment = require("../models/comment");

let getArticle = async (req, res, next) => {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (!article)
      return res
        .status(404)
        .json({ message: `Cannot find article with id: ${req.params.id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.article = article;
  next();
};

//Getting all Articles
router.get("/", async (req, res) => {
  try {
    const Articles = await Article.find();
    res.send(Articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting comments on each article
router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.find({
      parent_article_id: req.params.id,
    });
    res.send(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Additng an Article
router.post("/", async (req, res) => {
  const article = new Article({
    text: req.body.text,
    url: req.body.url,
    date: Date.now(),
  });
  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updateting an Article
router.patch("/:id", async (req, res) => {
  if (req.body.text) {
    res.article.text = req.body.text;
  }
  if (req.body.url) {
    res.article.url = req.body.url;
  }
  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting an Article
router.delete("/:id", getArticle, async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: "article deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
