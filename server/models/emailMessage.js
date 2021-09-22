const dotenv = require('dotenv');
const mail = require('@sendgrid/mail');
const { getEnvironmentInfo } = require('../utilities/common');

dotenv.config();

// mail.setApiKey(process.env.MAIL_API);
mail.setApiKey(process.env.MAIL_API_KRIS);

const [_, isProduction] = getEnvironmentInfo();

const HOST = isProduction
  ? process.env.REMOTE_FRONTEND_HOST
  : process.env.LOCAL_FRONTEND_HOST;

function createMessage(email, code) {
  return {
    to: email,
    from: 'welearnbg@gmail.com',
    subject: 'Reset password email',
    text: 'Your email for password reset at IT-BG News',
    html: `<a href="${HOST}/verify?token=${code}&email=${email}">Click here to reset your password.</a>`,
  };
}

function verifyMessage(email, code) {
  return {
    to: email,
    from: 'welearnbg@gmail.com',
    subject: 'Verify account',
    text: 'Click the link to verify your registration at IT-BG News',
    html: `<a href="${HOST}/reset-pass?token=${code}">Click here to verify your account.</a>`,
  };
}

module.exports = { createMessage, verifyMessage, mail };
