const express = require('express');
const { getUser } = require('../functions/getters');
const router = express.Router();

//get info about each user
router.get('/:user_id', getUser, (req, res) => {
    res.json(res.user);
});


module.exports = router;
