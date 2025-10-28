"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.DatabaseError = exports.TenantNotFoundError = exports.ConflictError = exports.NotFoundError = exports.AuthorizationError = exports.AuthenticationError = exports.ValidationError = exports.AppError = void 0;
/**
 * Custom error classes for Arc
 * All services use these for consistent error handling
 */
class AppError extends Error {
    constructor(code, message, statusCode = 500, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
/**
 * Specific error classes for different scenarios
 */
class ValidationError extends AppError {
    constructor(message, details) {
        super('VALIDATION_ERROR', message, 400, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super('AUTHENTICATION_ERROR', message, 401);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends AppError {
    constructor(message = 'Access denied') {
        super('AUTHORIZATION_ERROR', message, 403);
        this.name = 'AuthorizationError';
    }
}
exports.AuthorizationError = AuthorizationError;
class NotFoundError extends AppError {
    constructor(resource) {
        super('NOT_FOUND', `${resource} not found`, 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message) {
        super('CONFLICT', message, 409);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class TenantNotFoundError extends AppError {
    constructor(tenantId) {
        super('TENANT_NOT_FOUND', `Tenant ${tenantId} not found`, 404);
        this.name = 'TenantNotFoundError';
    }
}
exports.TenantNotFoundError = TenantNotFoundError;
class DatabaseError extends AppError {
    constructor(message = 'Database operation failed') {
        super('DATABASE_ERROR', message, 500);
        this.name = 'DatabaseError';
    }
}
exports.DatabaseError = DatabaseError;
class InternalServerError extends AppError {
    constructor(message = 'Internal server error') {
        super('INTERNAL_SERVER_ERROR', message, 500);
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=errors.js.map