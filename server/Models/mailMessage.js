const dotenv = require('dotenv');
const mail = require('@sendgrid/mail');

dotenv.config();

mail.setApiKey(process.env.MAIL_API);

function createMessage(mail, code) {
    const msg = {
        to: mail,
        from: 'itbghackernews@gmail.com',
        subject: 'Hi',
        text: 'Verify your email',
        html: `<a href="https://localhost:3000/verify?token=${code}">Click here to verify your account</a>`,
    }

    return msg;
}

function verifyMessage(mail, code) {
    const msg = {
        to: mail,
        from: 'itbghackernews@gmail.com',
        subject: 'Hi',
        text: 'Click the link to reset password',
        html: `<a href="https://localhost:3000/reset-pass?token=${code}">Click here to verify</a>`,
    }
 
    return msg;
 }

module.exports = { createMessage, verifyMessage, mail };