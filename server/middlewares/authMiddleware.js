const jwt = require('jsonwebtoken');
const redis_client = require('../config/redisConfig');
const { isEmpty } = require('../utilities/common');

function verifyToken(req, res, next) {
    try {
        // Bearer token string
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.userData = decoded;

        req.token = token;

        // verify blacklisted access token.
        redis_client.get('BL_' + decoded.sub.toString(), (err, data) => {
            if (err) throw err;

            if (data === token) {
                next(
                    res
                        .status(401)
                        .json({ status: false, message: 'blacklisted token.' }),
                );
            }
        });
    } catch (error) {
        next(
            res.status(401).json({
                status: false,
                message: 'Your session is not valid.',
                data: error,
            }),
        );
    }
    next();
}

function verifyRefreshToken(req, res, next) {
    const token = req.body.token;
    console.log(token);
    if (token === null)
        return res
            .status(401)
            .json({ status: false, message: 'Invalid request.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        req.userData = decoded;

        // verify if token is in store or not
        redis_client.get(decoded.sub.toString(), (err, data) => {
            if (err) {
                throw err;
            }

            if (data === null) {
                next(
                    res.status(401).json({
                        status: false,
                        message: 'Invalid request. Token is not in store.',
                    }),
                );
            }

            if (JSON.parse(data).token !== token) {
                next(
                    res.status(401).json({
                        status: false,
                        message: 'Invalid request. Token is not same in store.',
                    }),
                );
            }
        });
    } catch (error) {
        console.log(error);
        next(
            res.status(401).json({
                status: true,
                message: 'Your session is not valid.',
                data: error,
            }),
        );
    }
    next();
}

function validateEmail(email) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function validateInputData(req, res, next) {
    const re = /\d/;
    const { password, username, email } = req.body;
    let errors = {};

    if (username.length < 6 || username.length > 30) {
        errors.errorUsername =
            'Username must be at least 6 letters and at most 30.';
    }
    if (!validateEmail(email)) {
        errors.errorEmail = 'The provided email is not valid.';
    }
    if (password.length < 6 || password.length > 30 || !re.test(password)) {
        errors.errorPassword =
            'The password must have one digit at least, and to be between 6 and 30 symbols';
    }

    if (!isEmpty(errors)) {
        res.json(errors);
    }

    next();
}

module.exports = {
    verifyToken,
    verifyRefreshToken,
    validateInputData,
};
