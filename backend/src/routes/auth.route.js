const express = require('express');
const authRouter = express.Router();
const {registerUser, loginUser, logoutUser} = require('../controllers/auth.controller');
const {authMiddleware} = require('../middlewares/auth.middleware');


/*    @route POST /api/auth/register
      @desc Register a new user
      @access Public
*/
authRouter.post('/register', registerUser);


/*    @route POST /api/auth/login
      @desc Login a user
      @access Public
*/
authRouter.post('/login', loginUser);

/*    @route POST /api/auth/logout
      @desc Logout a user
      @access Private
*/
authRouter.post('/logout', authMiddleware,logoutUser);

module.exports = authRouter;