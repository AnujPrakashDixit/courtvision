const config = require('../config/config');
const jwt = require('jsonwebtoken');


function generateAccessToken(userId) {
    // Implementation for generating access token
    const accessToken = jwt.sign({ userId }, config.jwtAccessSecret, {
        expiresIn: config.jwtAccessExpiry
    });
    return accessToken
}

function generateRefreshToken(userId) {
    // Implementation for generating refresh token
    const refreshToken = jwt.sign({ userId }, config.jwtRefreshSecret, {
        expiresIn: config.jwtRefreshExpiry
    });
    return refreshToken
}

function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, config.jwtAccessSecret);
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired access token');
    }
}

function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, config.jwtRefreshSecret);
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired refresh token');
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};