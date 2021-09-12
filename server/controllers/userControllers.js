const User = require('../models/userSchema');
const redis_client = require('../config/redisConfig');
const bcrypt = require('bcrypt');
const { makeRefresh } = require('../utilities/token');

async function register(req, res) {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        const saved_user = await user.save();
        const [accessToken, refreshToken] = makeRefresh(saved_user._id);
        res.json({
            status: true,
            message: 'Registered successfully.',
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        if (error.code === 1100) {
            res.status(409).json({
                DuplicatedValue: 'The username or email is already user',
            });
        }
        res.status(400).json({
            status: false,
            message: 'Something went wrong.',
            data: error,
        });
    }
}

async function login(req, res) {
    const { password, email } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({
            email,
        }).exec();

        if (user === null) {
            res.status(401).json({
                status: false,
                message: 'There is no such user in the database.',
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            res.status(401).json({
                error: 'Incorrect password',
            });
        }
        const [accessToken, refreshToken] = makeRefresh(user._id);
        return res.json({
            status: true,
            message: 'login success',
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ status: true, message: 'login fail', data: error });
    }
}

async function logout(req, res) {
    // frontend must remove access token here [from cookie]
    const user_id = req.userData.sub;

    await redis_client.del(user_id.toString());

    return res.json({ status: true, message: 'success.' });
}

function getAccess(req, res) {
    const userId = req.userData.sub;
    const [accessToken, refreshToken] = makeRefresh(userId);
    res.status(200).json({
        data: {
            accessToken,
            refreshToken,
        },
    });
}

module.exports = {
    register,
    logout,
    login,
    getAccess,
};
