const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const users = [
        {id: 1, firstName: 'John', lastName: 'Doe', commentsCount: 123},
        {id: 2, firstName: 'Mary', lastName: 'Jane', commentsCount: 3},
        {id: 3, firstName: 'Kim', lastName: 'Thompson', commentsCount: 0},
        {id: 4, firstName: 'Scott', lastName: 'Robinson', commentsCount: 5},
        {id: 5, firstName: 'Hughes', lastName: 'Sanchez', commentsCount: 1},
    ];

    res.json(users);
});

module.exports = router;
