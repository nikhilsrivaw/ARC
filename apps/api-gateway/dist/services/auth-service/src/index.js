"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("@arc/logger"));
const logger = new logger_1.default({
    serviceName: 'auth-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});
const PORT = process.env.AUTH_SERVICE_PORT || 3001;
app_1.default.listen(PORT, () => {
    logger.info(`Auth Service running on port ${PORT}`);
});
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});
//# sourceMappingURL=index.js.map