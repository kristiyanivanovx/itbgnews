require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});

db.once("open", () => {
  console.log("Connected to DB");
});

app.use(express.json());

const articlesRouter = require("./routes/articles");
const commentRouter = require("./routes/comments");
app.use("/articles", articlesRouter);
app.use("/addComment", commentRouter);

app.listen(process.env.PORT, () => {
  console.log(`server has started on port: ${process.env.PORT}`);
});
