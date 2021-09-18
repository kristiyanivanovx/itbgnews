const app = require('express');
const router = app.Router();

const verifySchema = require('../models/verifySchema');
const user = require('../models/user');

const { mail } = require('../models/mailMessage');
const crypto = require('crypto');

const { createMessage } = require('../models/mailMessage');
const dotenv = require('dotenv');

const { hash } = require('bcrypt');

dotenv.config();

router.use(app.json());

router.post('/password-reset', async (req, res) => {
    const { token, email, password } = req.body;

    const encryptedPassword = await hash(password, 10);

    let dbToken = await verifySchema.findOne({ token: token });
    if (dbToken != null) {
        await user
            .updateOne({ email }, { password: encryptedPassword })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        await verifySchema.findOneAndDelete(
            { token: token },
            function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(docs);
                }
            },
        );
    }

    console.log('HERE? dawe');
});

router.post('/forgotten', (req, res) => {
    let code = crypto.randomBytes(8).toString('hex');

    console.log(code);
    
    console.log(req.body.email);

    let user = new verifySchema({
        token: code,
        email: req.body.mail,
        createdAt: Date(),
    });

    user.save()
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            console.log(`${req.body.mail} has been added successfully`);
        });

    const msg = createMessage(req.body.mail, code);

    mail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
        })
        .catch((error) => {
            console.error(error);
        });
    res.send('Hello');
});

module.exports = router;
