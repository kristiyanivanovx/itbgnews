const router = require('express').Router();
const userController = require('../controllers/user-controllers');
const authMiddleware = require('../middlewares/auth-middleware');

router.post(
   '/register',
   authMiddleware.validateInputData,
   userController.Register
);
router.post('/login', userController.Login);
router.post(
   '/token',
   authMiddleware.verifyRefreshToken,
   userController.GetAccessToken
);
router.post('/logout', authMiddleware.verifyToken, userController.Logout);

router.get('/', authMiddleware.verifyToken, (req, res) => {
   res.send('nice job');
});

module.exports = router;
