const express = require('express')

const router = express.Router();

const userController  = require('../controllers/userController');



// all users routes

router.get('/users', userController.getUsers);

// register
router.post('/register',userController.registerUser);
// login user

router.post('/login', userController.loginUser);

//forgot password route

router.post('/forgot-password', userController.forgotPassword);

// reset password routes

router.post('/reset-password/:token', userController.resetPassword);







module.exports = router;