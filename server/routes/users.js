const express = require('express');
const { userGetter } = require('../functions/getters');
const router = express.Router();

//get info about each user
router.get('/:userId', userGetter, (req, res) => {
  res.json(req.user);
});

module.exports = router;
