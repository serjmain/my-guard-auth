const queryHelper = require('../service/requestHelper');

module.exports = {
    TABLE: 'tokens',   

    async getAll() { 
               
        const getUsers = async () => {
            const query = `SELECT * FROM authUsers`;
            return queryHelper.process(query);
        };        

        const getTokens = async () => {
            const query = `SELECT * FROM ${this.TABLE}`;
            return queryHelper.process(query);
        }       

        const [users, tokens] = await Promise.all([getUsers(), getTokens()])
        
        return users.map((user) => {
            const isActive = tokens.find(({ userid }) => String(user.userid) === String(userid));
            return {
                email: user.email,
                id: user.userid,
                role: user.role,
                active: !!isActive,
            }
        })               
    },


    async saveUserToken(userId, refreshToken, role) {
        const query = `INSERT INTO ${this.TABLE} (id, userId, refreshToken, role) VALUES(now(), ?,?,?) IF NOT EXISTS`;

        return queryHelper.process(query, { userId, refreshToken, role });
    },    

    async clearUserTokens(userId) {

        const query = `DELETE FROM ${this.TABLE} WHERE userId = ${userId}`;

        return queryHelper.process(query);
    },

    async getByToken(refreshToken) {

        const query = `SELECT * FROM ${this.TABLE} WHERE refreshToken = '${refreshToken}' ALLOW FILTERING`;
        
        return queryHelper.process(query, undefined, undefined, true);
    },
}
