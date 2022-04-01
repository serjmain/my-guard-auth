const client = require('../config/database');

module.exports = {   

    async getAll() {
        
        const query = `SELECT * FROM tokens`;
        
        return await client.execute(query);
    },    

    async saveUserToken(userId, refreshToken, role) {

        const query = `INSERT INTO tokens (id, userId, refreshToken, role) VALUES(now(), ?,?,?) IF NOT EXISTS`;

        return await client.execute(query, { userId, refreshToken, role });
    },    

    async clearUserTokens(userId) {

        const query = `DELETE FROM tokens WHERE userId = ${userId}`;

        return await client.execute(query);
    },

    async getByToken(refreshToken) {

        const query = `SELECT * FROM tokens WHERE refreshToken = '${refreshToken}' ALLOW FILTERING`;
        
        return await client.execute(query);
    },    
}