const { validatePassword } = require('../utilities/validation');
const { hash } = require('bcrypt');
const verifySchema = require('../models/verifySchema');
const userSchema = require('../models/user');
const crypto = require('crypto');
const { createMessage, mail } = require('../models/emailMessage');
const validator = require('validator');
const User = require('../models/user');

async function passwordReset(req, res) {
  const { token, email, password } = req.body;

  if (!validatePassword(password)) {
    res.status(401).json({
      passwordError:
        'the password must be between 10 and 30 characters and to consist 1 digit at least',
    });
  }

  const encryptedPassword = await hash(password, 10);

  // todo email === dbToken.email
  let dbToken = await verifySchema.findOne({ token: token });
  if (dbToken != null) {
    await userSchema
      .updateOne({ email }, { password: encryptedPassword })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });

    await verifySchema.findOneAndDelete({ token: token }, function (err, docs) {
      if (err) {
        throw err;
      } else {
        console.log(docs);
      }
    });
  }

  res.json({ data: 'success' });
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

  let verify = new verifySchema({
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

  const msg = createMessage(req.body.email, code);

  mail
    .send(msg)
    .then((response) => {
      const statusCode = response[0].statusCode;
      const headers = response[0].headers;
      console.log(statusCode);
      console.log(headers);

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
