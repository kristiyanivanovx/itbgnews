const dotenv = require('dotenv');
const mail = require('@sendgrid/mail');
const { getEnvironmentInfo } = require('../utilities/common');
const { getHTML } = require('./templates/email');

dotenv.config();

mail.setApiKey(process.env.MAIL_API);

const [ENV, isProduction] = getEnvironmentInfo();

const HOST = isProduction
  ? process.env.REMOTE_FRONTEND_HOST
  : process.env.LOCAL_FRONTEND_HOST;

function createMessage(email, code) {
  return {
    to: email,
    from: 'itbgnews@gmail.com',
    subject: 'Имейл за възстановяване на паролата в IT-BG News',
    html: getHTML(HOST, code, email),
  };
}

function verifyMessage(email, code) {
  return {
    to: email,
    from: 'itbgnews@gmail.com',
    subject: 'Verify account',
    html: `<a href="${HOST}/reset-pass?token=${code}">Click here to verify your account at IT-BG News.</a>`,
  };
}

module.exports = { createMessage, verifyMessage, mail };
