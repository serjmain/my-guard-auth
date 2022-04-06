const client = require('../config/database');

module.exports = {   
    async process(query, params, options, parseOne = false) {
        const result = await client.execute(query, params, options);
        return parseOne ? result.rows[0] : result.rows;
    }
}