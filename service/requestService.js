const authRepository = require('../model/authRepository');
const axios = require('axios');
// const userService = require('../config/user.heroku-config.json');
const req = require('express/lib/request');

module.exports = {
    async registration(payload) {
       // return axios.post(`${userService.URL}/`, payload);    

        return { id: 'c7fd0cf8-902a-11ec-b909-0242ac120' + Math.floor(Math.random() * (899) + 100) };
    },
    async login(payload) {
        // return axios.post('/LOGIN', payload); 
        
        const res = await authRepository.getAll()
        const item = res.rows[0] || { error: 'not found' }
        return { id: item.id, error: item.error };
    }    
}