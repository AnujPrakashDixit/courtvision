const express = require('express');
const authRouter = express.Router();
const {registerUser, loginUser} = require('../controllers/auth.controller');


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



module.exports = authRouter;