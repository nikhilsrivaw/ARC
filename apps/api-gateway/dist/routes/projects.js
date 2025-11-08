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
const PROJECT_SERVICE_URL = process.env.PROJECT_SERVICE_URL || 'http://localhost:3004';
// GET /projects - List all projects
router.get('/', async (req, res) => {
    try {
        const context = req.context;
        const response = await axios_1.default.post(`${PROJECT_SERVICE_URL}/projects`, {
            headers: {
                Authorization: req.headers.authorization,
                'X-Tenant-ID': context.tenantId,
            }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        logger.error("failed to fetch projects ", { error: error.message });
        res.status(error.response?.status || 500).json({
            succes: false,
            error: { code: "FETCH_FAILED", message: " failed to fetch the projects" }
        });
    }
});
// POST /projects - Create project
router.post('/', async (req, res) => {
    try {
        const context = req.context;
        const response = await axios_1.default.post(`${PROJECT_SERVICE_URL}/projects`, req.body, {
            headers: {
                Authorization: req.headers.authorization,
                'X-Tenant-ID': context.tenantId,
            },
        });
        logger.info('Project created', { tenantId: context.tenantId });
        res.status(201).json(response.data);
    }
    catch (error) {
        logger.error('Failed to create project', { error: error.message });
        res.status(error.response?.status || 500).json({
            success: false,
            error: { code: 'CREATE_FAILED', message: 'Failed to create project' },
        });
    }
});
exports.default = router;
//# sourceMappingURL=projects.js.map