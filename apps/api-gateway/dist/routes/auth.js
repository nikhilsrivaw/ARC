"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("@arc/logger"));
const router = (0, express_1.Router)();
const logger = new logger_1.default({
    serviceName: 'api-gateway',
    logLevel: "DEBUG",
    enableConsole: true,
    enableFile: false,
});
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
//POST /auth/register
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const response = await axios_1.default.post(`${AUTH_SERVICE_URL}/auth/register`, body);
        logger.info('User registered', { email: body.email });
        res.status(201).json(response.data);
    }
    catch (error) {
        logger.error('Registration failed', { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: {
                code: 'REGISTRATION_FAILED',
                message: error.response?.data?.message || 'Registration failed',
            },
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        // Cal Auth Sevrice 
        const response = await axios_1.default.post(`${AUTH_SERVICE_URL}/auth/login`, body);
        logger.info('USER logged in ', { email: body.email });
        res.status(200).json(response.data);
    }
    catch (error) {
        logger.error('Login failed ', { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: {
                code: 'LOGIN_FAILED',
                message: error.response?.data?.message || 'Login failed',
            }
        });
    }
});
// /auth/refresh
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        // Call Auth service 
        const response = await axios_1.default.post(`${AUTH_SERVICE_URL}/auth/refresh`, { refreshToken });
        logger.info('Token refreshed');
        res.status(200).json(response.data);
    }
    catch (error) {
        logger.error("Token refresh failed", { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: {
                code: 'REFRESH_FAILED',
                message: 'Token refresh failed',
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map