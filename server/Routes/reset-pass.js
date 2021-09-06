const app = require('express');
const router = app.Router();

const verifySchema = require('../models/verify-schema');
const userSchema = require('../models/user-schema');

const mail = require('@sendgrid/mail');
const crypto = require('crypto');

const message = require('../models/mailMessage');
const dotenv = require('dotenv');
dotenv.config();

mail.setApiKey(process.env.MAIL_API);

router.use(app.json());

router.post('/password-reset', (req, res) => {
    const { token, mail, password } = req.body;

    console.log(verifySchema.findOneAndDelete({token: token}, function(err, docs) {
        if(err)
            console.log(err);
        else {
            console.log(docs);
            userSchema.updateOne({mail: mail}, {password: password}).catch(err => {
                console.log(err);
            }).then(docs => {
                console.log("SUCCESS " + docs);
            })
        } 
            
    }));

    console.log("HERE?");
});

router.patch('/password-token', (req, res) => {

    console.log(req.body);
    let code = crypto.randomBytes(8).toString('hex');
    let user = new verifySchema({
        token: code,
        mail: req.body.mail,
        createdAt: Date()
    })
    
    user.save().catch((err) => {
        console.log(err);
    }).then(() => {
        console.log(`${req.body.mail} has been added successfully`);
    });

    const msg = message(req.body.mail, code);

    mail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
    res.send("Hello");
});

router.get('/', (res, req) => {
    console.log("==============here");
});

module.exports = router;