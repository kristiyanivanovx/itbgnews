const User = require('../models/user');
const redisClient = require('../config/redisConfig');
const bcrypt = require('bcrypt');
const { makeRefresh } = require('../utilities/token');

async function register(req, res) {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const [accessToken, refreshToken] = makeRefresh(user._id);
    const savedUser = await user.save();

    res.json({
      status: true,
      message: 'Registered successfully.',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error.code === 1100) {
      res.status(409).json({
        DuplicatedValue: 'The username or email is already user',
      });
    }

    res.status(400).json({
      status: false,
      message: 'Something went wrong.',
      data: error,
    });
  }
}

async function login(req, res) {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({
      email,
    }).exec();

    if (user === null) {
      res.status(401).json({
        status: false,
        message: 'There is no such user in the database.',
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(401).json({
        error: 'Incorrect password',
      });
    }
    const [accessToken, refreshToken] = makeRefresh(user._id);

    return res.json({
      status: true,
      message: 'login success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: true, message: 'login fail', data: error });
  }
}

async function logout(req, res) {
  // frontend must remove access token here [from cookie]
  const userId = req.user.sub;
  console.log('userId');
  console.log(userId);

  await redisClient.del(userId.toString());

  return res.status(200).json({ status: true, message: 'success.' });
}

function getAccess(req, res) {
  const userId = req.user.sub;
  const [accessToken, refreshToken] = makeRefresh(userId);

  res.status(200).json({
    data: {
      accessToken,
      refreshToken,
    },
  });
}

module.exports = {
  register,
  logout,
  login,
  getAccess,
};
