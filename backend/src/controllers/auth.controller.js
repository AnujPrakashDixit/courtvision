const { register, login } = require('../services/auth.service');
const config = require('../config/config');
const { redisClient } = require('../config/redis');
const { verifyRefreshToken, generateAccessToken } = require('../utils/jwt');

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

async function logoutUser(req, res) {
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        await redisClient.del(`refreshToken:${userId}`);
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error logging out user' });
    }
}

async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is missing' });
    }

    try{
        const decoded = verifyRefreshToken(refreshToken);
        const userId = decoded.userId;

        // Check if the refresh token exists in Redis
        const storedToken = await redisClient.get(`refreshToken:${userId}`);

        if(storedToken !== refreshToken){
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken(userId);
        res.status(200).json({ accessToken: newAccessToken });

    }
    catch(err){
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
};