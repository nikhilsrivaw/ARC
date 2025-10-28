"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = getDatabaseConfig;
function getDatabaseConfig() {
    return {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'arc_prod',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        poolMin: parseInt(process.env.DB_POOL_MIN || '5'),
        poolMax: parseInt(process.env.DB_POOL_MAX || '20'),
        poolIdleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
    };
}
//# sourceMappingURL=config.js.map