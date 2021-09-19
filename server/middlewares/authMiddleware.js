const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisConfig');
const { isEmpty } = require('../utilities/common');
const { validatePassword, validateEmail } = require('../utilities/validation');

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: false,
      message: 'Your session is not valid.',
      data: error,
    });

    return;
  }

  next();
}

function verifyRefreshToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (token === null) {
    res.status(401).json({ status: false, message: 'Invalid request.' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.user = decoded;

    // verify if token is in store or not
    redisClient.get(decoded.sub.toString(), (err, data) => {
      if (err) {
        throw err;
      }

      if (data === null) {
        res.status(401).json({
          status: false,
          message: 'Invalid request. Token is not in store.',
        });

        return;
      }

      if (JSON.parse(data).token !== token) {
        res.status(401).json({
          status: false,
          message: 'Invalid request. Token is not same in store.',
        });

        return;
      }
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Your session is not valid.',
      data: error,
    });

    return;
  }
  next();
}

function validateInputData(req, res, next) {
  const { password, username, email } = req.body;
  let errors = {};

  if (username.length < 6 || username.length > 30) {
    errors.errorUsername =
      'Username must be at least 6 letters and at most 30.';
  }
  if (!validateEmail(email)) {
    errors.errorEmail = 'The provided email is not valid.';
  }
  if (!validatePassword(password)) {
    errors.errorPassword =
      'The password must have one digit at least, and to be between 6 and 30 symbols';
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
