"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("./pool"));
const logger_1 = __importDefault(require("@arc/logger"));
const logger = new logger_1.default({
    serviceName: 'database',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false
});
class Database {
    async query(tenantId, sql, params) {
        const client = await pool_1.default.connect();
        try {
            await client.query('SET search_path = $1', [tenantId]);
            const result = await client.query(sql, params || []);
            logger.debug('Query executed', { tenantId, sql });
            return result.rows;
        }
        catch (error) {
            logger.error('database query failed ', {
                tenantId,
                sql,
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
        finally {
            client.release();
        }
    }
}
exports.default = new Database();
//# sourceMappingURL=database.js.map