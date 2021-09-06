const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose
   .connect('mongodb://localhost:27017/db')
   .then((er) => console.log('verify fine'))
   .catch((er) => console.log('verify not fine'));

const verifySchema = new Schema({
   mail: String,
   token: String,
   createdAt: {
       type: Date,
       index: {expireAfterSeconds: 1200} // 20 minutes
   } // TTL Index
});


verifySchema.index(
   {
      token: 1
   },
   {
      unique: true
   }
);
module.exports = mongoose.model('verifyModel', verifySchema);
