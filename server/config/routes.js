module.exports = (app) => {
    // const userRouter = require('../routes/users');
    // const postRouter = require('../routes/posts');
    // const loginRouter = require('../routes/login');
    // const registerRouter = require('../routes/register');

    // app.use('/api/users', userRouter);
    // app.use('/api/posts', postRouter);

    // app.use('/api/login', loginRouter);
    // app.use('/api/register', registerRouter);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    });
};