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
    enableFile: false
});
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3002';
// get /user/me - Get current usern
router.get('/me', async (req, res) => {
    try {
        const context = req.context;
        const response = await axios_1.default.get(`${USER_SERVICE_URL}/users/${context.userId}`, {
            headers: { Authorization: req.headers.authorization },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        logger.error("Failed to get user", { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: { code: 'FETCH_FAILED', message: 'Failed to fetch user' },
        });
    }
});
// update user profile 
router.put('/me', async (req, res) => {
    try {
        const context = req.context;
        const response = await axios_1.default.put(`${USER_SERVICE_URL}/users/${context.userId}`, req.body, {
            headers: { Authorization: req.headers.authorization },
        });
        logger.info("User updated ", { userId: context.userId });
        res.status(200).json(response.data);
    }
    catch (error) {
        logger.error("Error updating the user ", { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: { code: 'UPDATE_FAILED', message: 'Failed to update user' },
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map