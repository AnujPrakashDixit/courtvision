const { register, login } = require('../services/auth.service');
const config = require('../config/config');

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
        const result = await register({ username, email, password });


        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: config.node_env === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: result.user,
            accessToken: result.accessToken,

        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const result = await login({ email, password });
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: config.node_env === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'User logged in successfully',
            user: result.user,
            accessToken: result.accessToken,
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
};