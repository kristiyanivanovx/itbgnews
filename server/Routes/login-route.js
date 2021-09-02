const express = require('express')
const router = express.Router()

router.get('/', (req , res) => {
    // here we need to take news from database

})

router.get('/login',(req , res) => {
    res.send('It works for now')
})

router.post('/login', (req , res) => {
    const data = req.body.params
    req.isAuthenticated()
    // here we need to take data to database and use middleware for sessions
})




router.get
module.exports = router