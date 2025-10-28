import { ApiError } from '@arc/shared-types';
/**
 * Custom error classes for Arc
 * All services use these for consistent error handling
 */
export declare class AppError extends Error implements ApiError {
    code: string;
    statusCode: number;
    details?: Record<string, any>;
    constructor(code: string, message: string, statusCode?: number, details?: Record<string, any>);
}
/**
 * Specific error classes for different scenarios
 */
export declare class ValidationError extends AppError {
    constructor(message: string, details?: Record<string, any>);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(resource: string);
}
export declare class ConflictError extends AppError {
    constructor(message: string);
}
export declare class TenantNotFoundError extends AppError {
    constructor(tenantId: string);
}
export declare class DatabaseError extends AppError {
    constructor(message?: string);
}
export declare class InternalServerError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map