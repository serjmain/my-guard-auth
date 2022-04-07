const authRepository = require('../model/authRepository');
const userRepository = require('../model/userRepository');
const tokenService = require('../service/tokenGenerator');
const userService = require('../service/requestService');
const secret = require('../config/secretkey');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    async registration(req, res) {
        const role = 'USER';
        const { email, password, name } = req.body;
        const { data: { id, error } } = await userService.registration({ email, password, name })            

        if (error) {
            return res.status(400).json(error);
        }
        
        const hashPassword = bcrypt.hashSync(password, 7);
        const candidate = await userRepository.getByEmail(email);
        if (candidate) {
            return res.status(400).json({ message: 'user with this email already exist'})
        }
        

        await userRepository.saveUser(id, email, hashPassword);

        const { accessToken, refreshToken } = tokenService.createToken({ id, role });

        res.cookie('token', refreshToken, { httpOnly: true });        
        await authRepository.saveUserToken(id, accessToken, refreshToken, role);
        res.status(200).send({ accessToken, refreshToken });
    },

    getUsers(req, res) {
        authRepository
            .getAll(req.query)
            .then((result) => res.status(200).json(result))
            .catch(e => res.status(404).send(e));
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await userRepository.getByEmail(email);

        if (!user) {
            return res.status(400).json("OPS WRONG EMAIL");
        }
        const resultPass = await bcrypt.compare(password, user.password);

        if (!resultPass) {
            return res.status(400).json("OPS WRONG PASSWORD");
        }
        const { accessToken, refreshToken } = tokenService.createToken({ id: user.userid, role: user.role });

        await authRepository.clearUserTokens(user.userid);
        res.cookie('token', refreshToken, { httpOnly: true });
        await authRepository.saveUserToken(user.userid, accessToken, refreshToken, role = user.role);
        res.status(200).send({ accessToken, refreshToken });
    },

    async logout(req, res) {        
        const authHeader = req.headers.authorization;        
        const data = await jwt.verify(authHeader.split(' ')[1], secret.accessKey);               

        await authRepository.clearUserTokens(data.id);
        res.status(200).json({ message: 'successfully logout' })
    },

    async refresh(req, res) {
        const cookieToken = req.headers.cookie
        const result = cookieToken.replace(/^.{6}/, '');        
        
        const item = await authRepository.getByToken(result);        

        if (!item) {
            return res.status(404).json({ message: 'not auth' });
        }

        const { accessToken, refreshToken } = tokenService.createToken({ id: item.id, role: item.role });

        await authRepository.clearUserTokens(item.id);
        await authRepository.saveUserToken(item.id, accessToken, refreshToken, item.role);
        res.status(200).send({ accessToken, refreshToken });
    }
}
