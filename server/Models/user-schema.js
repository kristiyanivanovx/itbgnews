const mongoose = require('../config/conf');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: String,
   username: String,
   password: String,
   date: Date
});

userSchema.index(
   {
      email: 1
   },
   {
      unique: true
   }
);
userSchema.index(
   {
      username: 1
   },
   {
      unique: true
   }
);

module.exports = mongoose.model('User', userSchema);