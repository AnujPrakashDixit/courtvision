const config = require('../config/config');
const {verifyAccessToken} = require('../utils/jwt');
async function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = { id: decoded.userId };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired access token' });
    }
}

module.exports = {
    authMiddleware
};