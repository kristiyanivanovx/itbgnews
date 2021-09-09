const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    //type: Schema.Types.ObjectId,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
