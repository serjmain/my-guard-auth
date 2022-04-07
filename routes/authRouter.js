const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   schemas:
 *      UserAuth:
 *        type: object
 *        required:
 *            - email
 *            - password
 *            - name
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
 *      registrationResponce:
 *        type: object
 *        required:
 *            - accessToken
 *            - refreshToken
 *            - userId
 *            - role
 *        properties:
 *            accessToken:
 *              type: string
 *              description: accessToken
 *            refreshToken:
 *              type: string
 *              description: refreshToken
 *            userId: 
 *              type: string
 *              description: user id
 *            role:
 *              type: string
 *              description: role      
 *                        
 *        example:
 *            email: 1258@gmail.com
 *            password: ehhwetj651he             
 *      Token:
 *        type: object
 *        required:
 *            - accessToken
 *            - refreshToken
 *        properties:
 *            accessToken:
 *              type: text
 *              description: accessToken
 *            refreshToken:
 *              type: string
 *              description: refreshToken
 *        example:
 *            accessToken: a155cac0-a85a-11ec-9fcd-657971076650
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
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         description: User has been registered
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/registrationResponce'
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
 *             $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         description: User has been login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/registrationResponce'
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
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAuth'       
 *     responses:
 *       200:
 *         description: User has been login         
 *       500:
 *         description: Server error
 */

 authRouter.post('/logout', authController.logout);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh token
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]   
 *     responses:
 *       200:
 *         description: take new refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       500:
 *         description: Server error
 */
authRouter.get('/refresh', authController.refresh);

authRouter.get('/users', authController.getUsers);

module.exports = authRouter;
