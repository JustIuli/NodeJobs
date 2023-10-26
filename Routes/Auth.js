const express = require('express');

const authController = require('../Controllers/AuthController');

const router = express.Router();

// Login
router.get('/login' , authController.getLogin);
router.post('/login' , authController.postLogin);
//

// Register
router.get('/register' , authController.getRegister);
router.post('/register' , authController.postRegister);
//

// Logout
router.post('/logout' , authController.postLogout);
//

module.exports = router;