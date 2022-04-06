const axios = require('axios');
const userRegistration = require('../config/userRegistration.heroku-config.json');

module.exports = {
    async registration(payload) {
        return axios.post(`${userRegistration.URL}/`, payload);
    }
}
