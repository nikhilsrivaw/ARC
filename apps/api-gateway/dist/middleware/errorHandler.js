"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = __importDefault(require("@arc/logger"));
const shared_utils_1 = require("@arc/shared-utils");
const logger = new logger_1.default({
    serviceName: "api-gateway",
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false
});
function errorHandler(err, req, res, next) {
    logger.error('Request Failed', {
        path: req.path,
        method: req.method,
        error: err instanceof Error ? err.message : String(err),
    });
    if (err instanceof shared_utils_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            }
        });
    }
    else {
        res.status(500).json({
            success: false,
            error: {
                code: " INTERNAL_SERVER_ERROR",
                message: " An error  occured"
            }
        });
    }
}
//# sourceMappingURL=errorHandler.js.map