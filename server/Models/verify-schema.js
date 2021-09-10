const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose
   .connect('mongodb://localhost:27017/db')
   .then(() => console.log('verify fine'))
   .catch(() => console.log('verify not fine'));

const verifySchema = new Schema({
   mail: String,
   token: String,
   createdAt: {
   type: Date,
   expires: 2,
   default: Date.now}
});

verifySchema.index({"lastModifiedDate": 1 }, {expireAfterSeconds: 2});

verifySchema.index(
   {
      token: 1
   },
   {
      unique: true
   }
);
module.exports = mongoose.model("verifyModel", verifySchema);
