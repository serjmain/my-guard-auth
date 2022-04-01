const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/users', authController.getUsers);
authRouter.get('/refresh', authController.refresh);

module.exports = authRouter;
