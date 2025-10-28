import { ApiError } from '@arc/shared-types';

/**
 * Custom error classes for Arc
 * All services use these for consistent error handling
 */

export class AppError extends Error implements ApiError {
  code: string;
  statusCode: number;
  details?: Record<string, any>;

  constructor(
    code: string,
    message: string,
    statusCode: number = 500,
    details?: Record<string, any>
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'AppError';
  }
}

/**
 * Specific error classes for different scenarios
 */

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super('AUTHENTICATION_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super('AUTHORIZATION_ERROR', message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

export class TenantNotFoundError extends AppError {
  constructor(tenantId: string) {
    super('TENANT_NOT_FOUND', `Tenant ${tenantId} not found`, 404);
    this.name = 'TenantNotFoundError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super('DATABASE_ERROR', message, 500);
    this.name = 'DatabaseError';
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super('INTERNAL_SERVER_ERROR', message, 500);
    this.name = 'InternalServerError';
  }
}
