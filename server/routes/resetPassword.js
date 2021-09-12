const dotenv = require('dotenv');
dotenv.config();

const app = require('express');
const router = app.Router();

const {
    passwordReset,
    forgottenPassword,
} = require('../controllers/sendEmailControllers');

router.use(app.json());

router.post('/password-reset', passwordReset);

router.post('/forgotten', forgottenPassword);

module.exports = router;
