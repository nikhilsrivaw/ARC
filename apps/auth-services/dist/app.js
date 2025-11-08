"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("@arc/logger"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const logger = new logger_1.default({
    serviceName: 'auth-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false
});
app.use(express_1.default.json);
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'auth-service' });
});
app.use('/auth', auth_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map