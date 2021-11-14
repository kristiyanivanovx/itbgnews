const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConfig');
const { isEmpty } = require('../utilities/common');
const { validatePassword } = require('../utilities/validation');
const validator = require('validator');

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        status: false,
        message: 'Your token is not valid. Login or register first.',
      });

      return;
    }

    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    console.error(error);

    res.status(401).json({
      status: false,
      message: 'Your token is not valid.',
      data: error,
    });

    return;
  }

  next();
}

function verifyRefreshToken(req, res, next) {
  redisClient.get(req.body.userId, (err, data) => {
    const token = JSON.parse(data).token;

    try {
      const decoded = jwt.verify(
        token.toString(),
        process.env.JWT_REFRESH_SECRET,
      );

      if (err) {
        throw err;
      }

      if (data === null) {
        return res.status(401).json({
          status: false,
          message: 'Invalid request. Token is not in store.',
        });
      }

      req.user = decoded;
    } catch (error) {
      console.log(error);

      res.status(401).json({
        status: false,
        message: 'Your session is not valid.',
        data: error,
      });

      return;
    }

    next();
  });
}

function validateInputData(req, res, next) {
  const { password, username, email } = req.body;
  let errors = {};

  if (username.length < 6 || username.length > 13) {
    errors.errorUsername =
      'Username must be at least 6 letters and at most 13. (inclusive)';
  }

  if (!validator.isEmail(email)) {
    errors.errorEmail = 'The provided email is not valid.';
  }

  if (!validatePassword(password)) {
    errors.errorPassword =
      'The password must have one digit at least and be between 8 and 35 symbols (inclusive)';
  }

  if (isEmpty(errors)) {
    next();
  } else {
    return res.json(errors);
  }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
  validateInputData,
};
