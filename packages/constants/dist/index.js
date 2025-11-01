"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_LEVELS = exports.TASK_STATUS = exports.ROLES = exports.HTTP_STATUS = void 0;
// HTTP Status Codes
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};
// User Roles (same everywhere)
exports.ROLES = {
    OWNER: 'owner',
    ADMIN: 'admin',
    MEMBER: 'member',
    VIEWER: 'viewer',
};
// Task Statuses
exports.TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
};
// Log Levels
exports.LOG_LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};
//# sourceMappingURL=index.js.map