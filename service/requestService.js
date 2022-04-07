const axios = require('axios');
const userRegistration = require('../config/userRegistration.heroku-config.json');

module.exports = {
    async registration(payload) {
        const secretUserKey = 'SUPER_LIZA'
        // {data: { id: 'c7fd0cf8-902a-11ec-b909-0242ac120' + Math.floor(Math.random() * (899) + 100) }};
        return axios.post(`${userRegistration.URL}/`, { ...payload, secretUserKey });
    }
}
