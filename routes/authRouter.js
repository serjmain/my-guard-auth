const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   schemas:
 *      User:
 *        type: object
 *        required:
 *            - id
 *            - email
 *            - password
 *        properties:
 *            email:
 *              type: string
 *              description: User email
 *            password:
 *              type: string
 *              description: User password
 *            name:
 *              type: string
 *              description: User name
 *        example:
 *            email: 1258@gmail.com
 *            password: ehhwetj651he
 *            name: Gleb
  *      LoginResponce:
 *        type: object
 *        required:
 *            - id
 *            - email
 *            - password
 *        properties:
 *            email:
 *              type: string
 *              description: User email
 *            password:
 *              type: string
 *              description: User password *            
 *        example:
 *            email: 1258@gmail.com
 *            password: ehhwetj651he             
 *      Token:
 *        type: object
 *        required:
 *            - id
 *            - refreshToken
 *        properties:
 *            id:
 *              type: uuid
 *              description: User id
 *            refreshToken:
 *              type: string
 *              description: User refresh token
 *        example:
 *            id: a155cac0-a85a-11ec-9fcd-657971076650
 *            refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE2NDc3ODY3NzQsImV4cCI6MTY1MDM3ODc3NH0.-iI2u4xFIcXOnyc6lM_MlLx1DqHnu27DlIWwkRDPTHc
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authorization API
 */

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Registration user
 *     security: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User has been registered
 *       500:
 *         description: Server error
 */

authRouter.post('/registration', authController.registration);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     security: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginResponce'
 *     responses:
 *       200:
 *         description: User has been login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponce'
 *       500:
 *         description: Server error
 */
authRouter.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     security: 
 *       - bearerAuth: []
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginResponce'
 *     responses:
 *       200:
 *         description: User has been login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponce'
 *       500:
 *         description: Server error
 */

authRouter.post('/logout', authController.logout);
authRouter.get('/users', authController.getUsers);
authRouter.get('/refresh', authController.refresh);


module.exports = authRouter;
