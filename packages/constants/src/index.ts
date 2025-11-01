 // HTTP Status Codes
  export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  };

  // User Roles (same everywhere)
  export const ROLES = {
    OWNER: 'owner',
    ADMIN: 'admin',
    MEMBER: 'member',
    VIEWER: 'viewer',
  };

  // Task Statuses
  export const TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
  };

  // Log Levels
  export const LOG_LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  };
