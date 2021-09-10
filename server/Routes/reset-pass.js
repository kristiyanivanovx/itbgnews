const app = require('express');
const router = app.Router();

const verifySchema = require('../models/verify-schema');
const userSchema = require('../models/user-schema');

const {mail} = require('../models/mailMessage');
const crypto = require('crypto');

const { createMessage } = require('../models/mailMessage');
const dotenv = require('dotenv');

const { hash } = require('bcrypt');

dotenv.config();

router.use(app.json());

router.post('/password-reset', async (req, res) => {
    const { token, mail, password } = req.body;
    
    console.log(password);
    const encryptedPassword = await hash(password, 10);
    console.log(verifySchema.findOneAndDelete({token: token}, function(err, docs) {
        if(err)
            console.log(err);
        else {
            console.log(docs);
            userSchema.updateOne({mail: mail}, {password: encryptedPassword}).catch(err => {
                console.log(err);
            }).then(docs => {
                console.log("SUCCESS " + docs);
            })
        } 
            
    }));

    console.log("HERE?");
});

/*
{
    "token": "d19e3772914ca2ac",
    "mail": "galinaliobomirova@gmail.com",
    "password": "321"
}
*/

router.patch('/forgotten', (req, res) => {

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

    const msg = createMessage(req.body.mail, code);
    
    mail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
    res.send("Hello");
});

module.exports = router;