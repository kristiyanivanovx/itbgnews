const express = require('express');
const cors = require('cors');
const passport = require('passport')
const router = express.Router()
const app = express();
app.use(cors())

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


app.post('/login-page', (req , res) => {
    //
})