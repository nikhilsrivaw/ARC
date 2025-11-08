"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("@arc/logger"));
const logger = new logger_1.default({
    serviceName: 'api-gateway',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});
const PORT = process.env.API_GATEWAY_PORT || 3000;
// start server 
app_1.default.listen(PORT, () => {
    logger.info(`API Gateway running on port ${PORT}`);
});
// handle shutdown gracefully
process.on("SIGTERM", () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0); // Clean exit
});
//# sourceMappingURL=index.js.map