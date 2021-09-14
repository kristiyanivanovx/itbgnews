const router = require('express').Router();
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.json('hi');
});

router.post('/', authMiddleware.verifyToken, (req, res) => {
    res.send('ok');
});

router.post(
    '/register',
    authMiddleware.validateInputData,
    userController.register,
);

router.post('/login', userController.login);

router.post(
    '/token',
    authMiddleware.verifyRefreshToken,
    userController.getAccess,
);

router.post('/logout', authMiddleware.verifyToken, userController.logout);

module.exports = router;
