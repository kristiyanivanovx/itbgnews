const mongoose = require('mongoose');
<<<<<<< HEAD
=======
// const User = require('../data/User');
>>>>>>> 7fe7fa093ea24e64dffb6ee410543f024ee7fa97

module.exports = (settings) => {
    mongoose.connect(settings.db).catch((err) => console.error(err));

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            throw err;
        }

        console.log('MongoDB has connected!');
<<<<<<< HEAD
=======
        // User.seedAdminUser();
>>>>>>> 7fe7fa093ea24e64dffb6ee410543f024ee7fa97
    });

    db.on('err', (err) =>
        console.error('An error has occurred with MongoDB: ' + err),
    );
};
