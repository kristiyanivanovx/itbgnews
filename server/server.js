require('dotenv').config();

const { getEnvironmentInfo } = require('./utilities/common');
const [ENV, isProduction] = getEnvironmentInfo();
const PORT = isProduction ? process.env.PORT : process.env.BACKEND_PORT;

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const authRouter = require('./routers/authRouter');
const resetRouter = require('./routers/resetPasswordRouter');
const treeRouter = require('./routers/treeRouter');
const postsRouter = require('./routers/postsRouter');
const commentsRouter = require('./routers/commentsRouter');
const usersRouter = require('./routers/usersRouter');
const profileRouter = require('./routers/myProfile');

app
  .use(cors())
  .use(cookieParser())
  .use(express.json())
  .use('', authRouter)
  .use('', resetRouter)
  .use('/tree', treeRouter)
  .use('/posts', postsRouter)
  .use('/comments', commentsRouter)
  .use('/users', usersRouter)
  .use('/my-profile', profileRouter)
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${ENV}...`);
  });
