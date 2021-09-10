const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
