"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../services/authService");
const logger_1 = __importDefault(require("@arc/logger"));
const shared_utils_1 = require("@arc/shared-utils");
const router = (0, express_1.Router)();
const logger = new logger_1.default({
    serviceName: 'auth-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});
// POST /auth/register 
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const result = await authService_1.AuthService.register(body);
        res.status(201).json(result);
    }
    catch (error) {
        logger.error('Registeration Error', {
            error: error instanceof Error ? error.message : String(error),
        });
        if (error instanceof shared_utils_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: {
                    code: "REGISTRATION_ERROR",
                    message: error.message || "Registration failed"
                }
            });
        }
    }
});
router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const result = await authService_1.AuthService.login(body);
        res.status(200).json(result);
    }
    catch (error) {
        logger.error('Login Error', { error: error instanceof Error ? error.message : String(error) });
        if (error instanceof shared_utils_1.AppError) {
            res.status(error.statusCode).json({
                succes: false,
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        }
        else {
            res.status(401).json({
                success: false,
                error: {
                    code: "LOGIN_ERROR",
                    message: error.message || 'Logion failed '
                }
            });
        }
    }
});
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_REFRESH_TOKEN',
                    message: 'Refrsh token is required '
                },
            });
            return;
        }
        const result = authService_1.AuthService.refreshToken(refreshToken);
        res.status(200).json(result);
    }
    catch (error) {
        logger.error('Token refresh error', {
            error: error instanceof Error ? error.message : String(error),
        });
        if (error instanceof shared_utils_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        }
        else {
            res.status(401).json({
                success: false,
                error: {
                    code: "REFRESH_ERROR",
                    message: error.message || 'Token Resfresh failed '
                }
            });
        }
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map