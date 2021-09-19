const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verifySchema = new Schema({
  email: String,
  token: String,
  createdAt: {
    type: Date,
    expires: 2,
    default: Date.now,
  },
});

verifySchema.index({ lastModifiedDate: 1 }, { expireAfterSeconds: 2 });

verifySchema.index(
  {
    token: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model('verifyModel', verifySchema);
