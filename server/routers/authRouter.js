const router = require('express').Router();
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.json('hi');
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
