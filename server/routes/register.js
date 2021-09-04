const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // more backend logic...
    console.log(req.body);
    res.send(req);
});

module.exports = router;
