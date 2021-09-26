const app = require('express');
const router = app.Router();

const {
  passwordReset,
  forgottenPassword,
} = require('../controllers/sendEmailsController');

const dotenv = require('dotenv');

dotenv.config();

router.use(app.json());

router.post('/forgotten', forgottenPassword);

router.post('/password-reset', passwordReset);

module.exports = router;
