const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
   /* owner_username: {
        type: String,
        unique: true,
    },*/
    text: {
        type: String,
    },
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    url: {
        type: String,
    },
    upvoters: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    //if textContent is true then the file is available.
    //False => it has been deleted
    textContent: {
        type: Boolean,
        default: true,
    },
    last_edit_date: {
        type: Date,
    },
    creation_date: {
        type: Date,
    },
});

module.exports = mongoose.model('Post', postSchema);
