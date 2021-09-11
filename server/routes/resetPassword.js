const app = require('express');
const router = app.Router();

const {
    passwordReset,
    forgottenPassword,
} = require('../controllers/sendEmailControllers');
const dotenv = require('dotenv');

dotenv.config();

router.use(app.json());

router.post('/password-reset', passwordReset);

router.post('/forgotten', forgottenPassword);

module.exports = router;
