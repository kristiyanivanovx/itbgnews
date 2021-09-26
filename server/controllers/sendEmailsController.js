const { validatePassword } = require('../utilities/validation');
const verifyModel = require('../models/verifySchema');
const { createMessage, mail } = require('../models/emailMessage');
const validator = require('validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function passwordReset(req, res) {
  const { token, email, password } = req.body;

  if (!validatePassword(password)) {
    res.status(401).json({
      errorPassword:
        'The password must have one digit at least and be between 8 and 35 symbols.',
    });

    return;
  }

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    res.status(400).json({
      errorUser: 'No user with that email has been found in the database.',
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const dbToken = await verifyModel.findOne({ token: token });

  if (dbToken && dbToken.email === email) {
    await User.updateOne({ email }, { password: hashedPassword })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });

    await verifyModel
      .findOneAndDelete({ token: token })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  }

  res
    .status(202)
    .json({ result: 'Your password has been changed successfully.' });
}

async function forgottenPassword(req, res) {
  const code = crypto.randomBytes(8).toString('hex');
  const email = req.body.email;

  if (!validator.isEmail(email)) {
    res
      .status(400)
      .json({ errorEmail: 'The provided email is not a valid email.' });
    return;
  }

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    res.status(400).json({
      errorUser: 'No user with that email has been found in the database.',
    });
    return;
  }

  let verify = new verifyModel({
    token: code,
    email: email,
    createdAt: Date(),
  });

  await verify
    .save()
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log(`${req.body.email} has been added successfully`);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error });
    });

  const message = createMessage(email, code);

  mail
    .send(message)
    .then((response) => {
      const statusCode = response[0].statusCode;
      // const headers = response[0].headers;

      res.status(statusCode).json({ data: statusCode });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error });
    });
}

module.exports = {
  passwordReset,
  forgottenPassword,
};
