"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("@arc/auth-middleware"));
const logger_1 = __importDefault(require("@arc/logger"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const projects_1 = __importDefault(require("./routes/projects"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const rateLimiter_1 = require("./middleware/rateLimiter");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const logger = new logger_1.default({
    serviceName: 'api-gateway',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'api-gateway' });
});
app.use(rateLimiter_1.limiter);
app.use('/auth', auth_1.default);
// 6. AUTH MIDDLEWARE (for protected routes)
app.use(auth_middleware_1.default);
// 7. PROTECTED ROUTES (REQUIRE AUTH)
app.use('/users', users_1.default);
app.use('/projects', projects_1.default);
app.use('/tasks', tasks_1.default);
// 8. ERROR HANDLER (MUST BE LAST!)
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map