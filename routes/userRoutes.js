const express = require('express')

const router = express.Router();

const userController  = require('../controllers/userController');



// all users routes

router.get('/users', userController.getUsers);

// register
router.post('/user',userController.registerUser);







module.exports = router;