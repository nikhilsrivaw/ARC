"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("./config");
const config = (0, config_1.getDatabaseConfig)();
const pool = new pg_1.Pool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    min: config.poolMin,
    max: config.poolMax,
    idleTimeoutMillis: config.poolIdleTimeout,
});
exports.default = pool;
//# sourceMappingURL=pool.js.map