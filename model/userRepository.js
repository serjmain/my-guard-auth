const queryHelper = require('../service/requestHelper');

module.exports = {   
    TABLE: 'authUsers',

    async saveUser(userId, email, password, role = 'USER') {
        const query = `INSERT INTO ${this.TABLE} (id, email, password, role, userId) VALUES (now(), ?,?,?,?) IF NOT EXISTS`;
        return queryHelper.process(query, { email, password, role, userId }, { prepare: true });
    },

    async getByEmail(email) {
        const query = `SELECT * FROM  ${this.TABLE} WHERE email = '${email}' LIMIT 1 ALLOW FILTERING`;

        return queryHelper.process(query, undefined, undefined, true);
    }
}
