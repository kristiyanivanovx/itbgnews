const app = require('express');
const router = app.Router();

const verifySchema = require('../models/verify-schema');
const userSchema = require('../models/user-schema');

const mail = require('@sendgrid/mail');

const crypto = require('crypto');

mail.setApiKey("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");

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
})
/*
{
    "mail": "galinaliobomirova@gmail.com"
}
*/

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

    const msg = {
        to: `${req.body.mail}`,
        from: 'itbghackernews@gmail.com',
        subject: 'Reset Password',
        text: 'Click the link to reset password',
        html: `<a href="https://localhost:3000/reset-pass?token=${code}">Click here to verify</a>`,
    }

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