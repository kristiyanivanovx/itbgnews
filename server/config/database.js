const mongoose = require('mongoose');

module.exports = (settings) => {
    mongoose.connect(settings.db).catch((err) => console.error(err));

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            throw err;
        }

        console.log('MongoDB has connected!');
    });

    db.on('err', (err) =>
        console.error('An error has occurred with MongoDB: ' + err),
    );
};
