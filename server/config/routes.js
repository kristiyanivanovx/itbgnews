module.exports = (app) => {
<<<<<<< HEAD
=======
    // const userRouter = require('../routes/users');
    // const postRouter = require('../routes/posts');
    // const loginRouter = require('../routes/login');
    // const registerRouter = require('../routes/register');

    // app.use('/api/users', userRouter);
    // app.use('/api/posts', postRouter);

    // app.use('/api/login', loginRouter);
    // app.use('/api/register', registerRouter);

>>>>>>> 7fe7fa093ea24e64dffb6ee410543f024ee7fa97
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    });
};
