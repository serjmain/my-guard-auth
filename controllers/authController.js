const authRepository = require('../model/authRepository');
const tokenService = require('../model/tokenGenerator');
const userService = require('../service/requestService');
const req = require('express/lib/request');
const secret = require('../config/secretkey');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const { signedCookie } = require('cookie-parser');


module.exports = {
    async registration(req, res) {

        const { id, error } = await userService.registration(req.body);
                
        if (error) {
            return res.status(400).json(error);
        }
        
        const { accessToken, refreshToken } = tokenService.createToken({ id });
        
        res.cookie('token', refreshToken, { httpOnly: true });
        await authRepository.clearUserTokens(id);        
        await authRepository.saveUserToken(id, refreshToken, role = 'USER');
        res.status(200).send({ accessToken, refreshToken });
    },

    getUsers(req, res) {
        authRepository
            .getAll(req.query)
            .then((result) => res.status(200).json(result.rows))
            .catch(e => res.status(404).send(e));
    },

    async login(req, res) {

        const { id, error } = await userService.login(req.body);
                
        if (error) {
            return res.status(400).json(error);
        }
        const { accessToken, refreshToken } = tokenService.createToken({ id });

        await authRepository.clearUserTokens(id);
        await authRepository.saveUserToken(id, refreshToken, role = 'USER');
        res.status(200).send({ accessToken, refreshToken });
    },

    async logout(req, res) {

        const authHeader = req.headers.authorization;        
        const data = await jwt.verify(authHeader.split(' ')[1], secret.refreshKey);

        await authRepository.clearUserTokens(data.id);        
        res.status(200).json({ message: 'successfully logout' })
    },

    async refresh(req, res) {
        let cookieToken = req.headers.cookie 
        let result = cookieToken.replace(/^.{6}/, '');

        const item = await authRepository.getByToken(result); 
                       
        if (!item) {
            return res.status(404).json({ message: 'not auth' });
        }
        
        const { id } = item;
        
        const { accessToken, refreshToken } = tokenService.createToken({ id });        

        await authRepository.clearUserTokens(item.rows[0].id);        

        await authRepository.saveUserToken(item.rows[0].id, refreshToken, role = 'USER');
        res.status(200).send({ accessToken, refreshToken });
    }
}
