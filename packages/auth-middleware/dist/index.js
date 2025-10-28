"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("@arc/logger"));
const logger = new logger_1.default({
    serviceName: " auth-middleware",
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: true,
});
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: " NO token provided" });
        }
        const token = authHeader.substring(7); // remove bearer
        // verify token signature 
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.context = {
            userId: payload.userId,
            tenantId: payload.tenantId,
            email: payload.email,
            role: payload.role,
        };
        logger.debug('User authenticated', { userId: payload.userId });
        next();
    }
    catch (error) {
        logger.error('Authentication failed', {
            error: error instanceof Error ? error.message : String(error),
        });
        res.status(401).json({ error: "INvalid or expired token " });
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=index.js.map