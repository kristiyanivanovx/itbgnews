const { validatePassword } = require('../utilities/validation');
const { hash } = require('bcrypt');
const verifySchema = require('../models/verifySchema');
const userSchema = require('../models/userSchema');
const crypto = require('crypto');
const { createMessage, mail } = require('../models/mailMessage');

async function passwordReset(req, res) {
    console.log(req.body);
    const { token, email, password } = req.body;
    if (!validatePassword(password)) {
        res.status(401).json({
            passwordError:
                'the password must be between 10 and 30 characters and to consist 1 digit at least',
        });
    }
    const encryptedPassword = await hash(password, 10);

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

        await verifySchema.findOneAndDelete(
            { token: token },
            function (err, docs) {
                if (err) {
                    throw err;
                } else {
                    console.log(docs);
                }
            },
        );
    }
}

async function forgottenPassword(req, res) {
    let code = crypto.randomBytes(8).toString('hex');

    console.log(code);
    console.log(req.body.email);

    let user = new verifySchema({
        token: code,
        email: req.body.email,
        createdAt: Date(),
    });

    await user
        .save()
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            console.log(`${req.body.email} has been added successfully`);
        });
    const msg = createMessage(req.body.email, code);
    mail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports = {
    passwordReset,
    forgottenPassword,
};
