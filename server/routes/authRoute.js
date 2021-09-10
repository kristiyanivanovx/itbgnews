const router = require('express').Router();
const user_controller = require('../controllers/userControllers');
const auth_middleware = require('../middlewares/authMiddleware');

router.post('/', auth_middleware.verifyRefreshToken, (req, res) => {
    res.send('ok');
});

router.post(
    '/register',
    auth_middleware.validateInputData,
    user_controller.Register,
);

router.post('/login', user_controller.Login);

router.post(
    '/token',
    auth_middleware.verifyRefreshToken,
    user_controller.GetAccessToken,
);

router.get('/logout', auth_middleware.verifyToken, user_controller.Logout);

module.exports = router;
