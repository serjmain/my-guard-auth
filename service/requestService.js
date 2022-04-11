const axios = require('axios');
const userRegistration = require('../config/userRegistration.heroku-config.json');

module.exports = {
    async registration(payload) {
        const secretUserKey = 'SUPER_LIZA'        
        return axios.post(`${userRegistration.URL}/`, { ...payload, secretUserKey });
    }
}
