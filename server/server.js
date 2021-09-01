const express = require('express');
const app = express();
// const cors = require('cors');

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
