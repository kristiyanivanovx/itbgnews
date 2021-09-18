const mongoose = require('../config/mongooseConfig');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    passwordHash: String,
    date: Date,
    commentCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },
    //profilePhoto: {},
    //Getting it by looking at each post seems faster
    /*userComments: [
        {
            commentId: {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        },
    ],
    userPosts: [
        {
            postId: {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        },
    ],*/
    creationDate: Date,
});
userSchema.index(
    {
        email: 1,
    },
    {
        unique: true,
    },
);
userSchema.index(
    {
        username: 1,
    },
    {
        unique: true,
    },
);
module.exports = mongoose.model('User', userSchema);
