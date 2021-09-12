const router = require('express').Router();
const user_controller = require('../controllers/userControllers');
const auth_middleware = require('../middlewares/authMiddleware');

router.post('/', auth_middleware.verifyToken, (req, res) => {
    res.send('ok');
});

router.post(
    '/register',
    auth_middleware.validateInputData,
    user_controller.register,
);

router.post('/login', user_controller.login);

router.post(
    '/token',
    auth_middleware.verifyRefreshToken,
    user_controller.getAccess,
);

router.post('/logout',
    auth_middleware.verifyToken,
    user_controller.logout
);


module.exports = router;
