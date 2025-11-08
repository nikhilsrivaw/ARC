"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("@arc/database"));
const logger_1 = __importDefault(require("@arc/logger"));
const shared_utils_1 = require("@arc/shared-utils");
const passwordUtils_1 = require("../utils/passwordUtils");
const jwtUtils_1 = require("../utils/jwtUtils");
const logger = new logger_1.default({
    serviceName: 'api-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});
class AuthService {
    static async register(data) {
        try {
            // step :1 Validate input 
            if (!shared_utils_1.validators.isValidEmail(data.email)) {
                throw new shared_utils_1.ValidationError('Invalid email format');
            }
            if (!passwordUtils_1.PasswordUtils.validatePasswordStrength(data.password)) {
                throw new shared_utils_1.ValidationError('Password must be at least 8 characters with 1 uppercase letter and 1 number');
            }
            const existingAccount = await database_1.default.query('public', 'SELECT id FROM accounts WHERE email =$1', [data.email]);
            if (existingAccount.rows.length > 0) {
                throw new shared_utils_1.ValidationError('Email already registered');
            }
            const passwordHash = await passwordUtils_1.PasswordUtils.hashPassword(data.password);
            const accountId = (0, uuid_1.v4)();
            const tenantId = (0, uuid_1.v4)();
            await database_1.default.query('public', `INSERT INTO accounts (id , email , password_hash , status , emailVerified , createdAt)
                VALUES ($1 , $2 , $3 , $4 , $5 , $6)`, [accountId, data.email, passwordHash, 'active', false, new Date()]);
            logger.info('Account created', { email: data.email });
            //Create workspace for user
            const slug = data.workspaceName.toLowerCase().replace(/\s+/g, '-');
            await database_1.default.query('public', `INSERT INTO workspaces (id , name , owner_id , slug , subscriptionTier , status , createdAt)
                VALUES ($1 , $2 , $3 , $4 , $5, $6 , $7)`, [tenantId, data.workspaceName, accountId, slug, 'free', 'active', new Date()]);
            logger.info("WorkSpace Created", { tenantId, workspaceName: data.workspaceName });
            const payload = {
                userId: accountId,
                tenantId: tenantId,
                email: data.email,
                role: 'owner',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
            };
            const accessToken = jwtUtils_1.JWTUtils.generateAccessToken(payload);
            const refreshToken = jwtUtils_1.JWTUtils.generateRefreshToken(accountId, tenantId);
            // return response 
            return {
                success: true,
                data: {
                    token: accessToken,
                    refreshToken: refreshToken,
                    user: {
                        id: accountId,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                    },
                },
            };
        }
        catch (error) {
            logger.error('Registration failed', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
    static async login(data) {
        try {
            if (!shared_utils_1.validators.isValidEmail(data.email)) {
                throw new shared_utils_1.ValidationError('Invalid email');
            }
            const accounts = await database_1.default.query('public', 'SELECT id , password_hash FROM accounts WHERE email = $1', [data.email]);
            if (accounts.rows.length === 0) {
                throw new shared_utils_1.ValidationError('Invalid email or password');
            }
            const account = accounts.rows[0];
            const isPasswordValid = await passwordUtils_1.PasswordUtils.verifyPassword(data.password, account.password_hash);
            if (!isPasswordValid) {
                throw new shared_utils_1.ValidationError('Invalid email or password');
            }
            const workspaces = await database_1.default.query('public', 'SELECT id FROM workspaces WHERE owner_id = $1 LIMIT 1', [account.id]);
            if (workspaces.rows.length === 0) {
                throw new Error('User has no workspace');
            }
            const tenantId = workspaces.rows[0].id;
            const payload = {
                userId: account.id,
                tenantId: tenantId,
                email: data.email,
                role: 'owner',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
            };
            const accessToken = jwtUtils_1.JWTUtils.generateAccessToken(payload);
            const refreshToken = jwtUtils_1.JWTUtils.generateRefreshToken(account.id, tenantId);
            logger.info('User logged in', { email: data.email });
            return {
                success: true,
                data: {
                    token: accessToken,
                    refreshToken: refreshToken,
                    user: {
                        id: account.id,
                        email: data.email,
                    },
                },
            };
        }
        catch (error) {
            logger.error('Login failed', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
    static async refreshToken(refreshToken) {
        try {
            // Step 1: Verify refresh token
            const payload = jwtUtils_1.JWTUtils.verifyRefreshToken(refreshToken);
            // Step 2: Generate new access token
            const newPayload = {
                userId: payload.userId,
                tenantId: payload.tenantId,
                email: '', // Get from DB if needed
                role: 'owner',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
            };
            const accessToken = jwtUtils_1.JWTUtils.generateAccessToken(newPayload);
            logger.info('Token refreshed', { userId: payload.userId });
            return {
                success: true,
                data: {
                    token: accessToken,
                },
            };
        }
        catch (error) {
            logger.error('Token refresh failed', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map