const express = require('express');
const getters = require('../functions/getters');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

//get info about each user
router.get('/:userId', auth.verifyToken, getters.userGetter, (req, res) => {
  res.json(req.userData);
});

module.exports = router;
