function createMessage(mail, code) {
    const msg = {
        to: mail,
        from: 'itbghackernews@gmail.com',
        subject: 'Hi',
        text: 'Click the link to reset password',
        html: `<a href="https://localhost:3000/reset-pass?token=${code}">Click here to verify</a>`,
    }

    return msg;
}

module.exports = createMessage;