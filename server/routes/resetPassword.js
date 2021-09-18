const app = require('express');
const router = app.Router();

const verifySchema = require('../models/verifySchema');
const user = require('../models/user');

const { mail } = require('../models/mailMessage');
const crypto = require('crypto');

const { createMessage } = require('../models/mailMessage');

const dotenv = require('dotenv');
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


const {
    passwordReset,
    forgottenPassword,
} = require('../controllers/sendEmailControllers');

router.use(app.json());

router.post('/password-reset', passwordReset);

router.post('/forgotten', forgottenPassword);

module.exports = router;
