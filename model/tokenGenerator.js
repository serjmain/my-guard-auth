const jwt = require('jsonwebtoken');
const secret = require('../config/secretkey');

module.exports = {
    createToken(payload) {
        
        const accessToken = jwt.sign(payload, secret.accessKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, secret.refreshKey, { expiresIn: '5d' });
        
        return {
            accessToken,
            refreshToken
        };
    }
}
