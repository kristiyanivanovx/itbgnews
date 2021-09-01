module.exports = (app) => {



    const userRouter = require('../routes/users');
    const postRouter = require('../routes/posts');

    app.use('/api/users', userRouter);
    app.use('/api/posts', postRouter);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    })
}
