const { Client } = require("cassandra-driver");

module.exports = new Client({
    keyspace: "auth",
    cloud: {
        secureConnectBundle: "./secure-connect-authmyguard.zip",
    },
    credentials: {
        username: "ciTZeBCKIrRxSaHzWTGRxjSe",
        password: "_PBW7nPOuo.1ukLsL.pIFYLu7x-Dl+QDAacer+unBjejr07Azp6CfwN7bDOOvF,pct49W-weFv,MLunnE,LhIZ1OTjt58aDg7bJmYDR+zX91kHHzqfnxLt80.WI0Hucj",
    },
});