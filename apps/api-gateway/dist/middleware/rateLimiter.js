"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = __importDefault(require("@arc/logger"));
const logger = new logger_1.default({
    serviceName: 'api-gateway',
    logLevel: "DEBUG",
    enableConsole: true,
    enableFile: false,
});
// rate Limiter function
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: " Too many requests fromt his IP , pelase try again later",
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // don't rate limit the helath api 
        if (req.path === '/health') {
            return true;
        }
        return false;
    },
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', { ip: req.ip, path: req.path });
        res.status(429).json({
            success: false,
            error: {
                code: 'TOO_MANY_REQUESTS',
                message: 'Too many requests, please try again later.',
            }
        });
    }
});
//# sourceMappingURL=rateLimiter.js.map