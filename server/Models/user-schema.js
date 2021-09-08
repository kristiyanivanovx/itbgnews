const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose
   .connect('mongodb://localhost:27017/hackerNews')
   .then((er) => console.log('fine'))
   .catch((er) => console.log('not fine'));

const userSchema = new Schema({
   email: String,
   username: String,
   password: String,
   date: Date,
   token: String
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

module.exports = mongoose.model('userModel', userSchema);
