import { v4 as uuidv4 } from 'uuid';
import database from '@arc/database';
import Logger from '@arc/logger';
import { validators, ValidationError } from '@arc/shared-utils';
import { PasswordUtils } from '../utils/passwordUtils';
import { JWTUtils } from '../utils/jwtUtils';
import { JWTPayload } from '@arc/shared-types';


const logger = new Logger({
    serviceName: 'api-service',
    logLevel: 'DEBUG',
    enableConsole: true,
    enableFile: false,
});


export class AuthService {
    static async register(data: {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        workspaceName: string;
    }) {
        try {
            // step :1 Validate input 

            if (!validators.isValidEmail(data.email)) {
                throw new ValidationError('Invalid email format');
            }
            if (!PasswordUtils.validatePasswordStrength(data.password)) {
                throw new ValidationError(
                    'Password must be at least 8 characters with 1 uppercase letter and 1 number'
                );

            }

            const existingAccount = await database.query(
                'public',
                'SELECT id FROM accounts WHERE email =$1',
                [data.email]

            );

            if (existingAccount.rows.length > 0) {
                throw new ValidationError('Email already registered')
            }



            const passwordHash = await PasswordUtils.hashPassword(data.password);

            const accountId = uuidv4();
            const tenantId = uuidv4();


            await database.query(
                'public',
                `INSERT INTO accounts (id , email , password_hash , status , emailVerified , createdAt)
                VALUES ($1 , $2 , $3 , $4 , $5 , $6)`,
                [accountId, data.email, passwordHash, 'active', false, new Date()]
            )


            logger.info('Account created', { email: data.email });




            //Create workspace for user
            const slug = data.workspaceName.toLowerCase().replace(/\s+/g, '-');


            await database.query(
                'public',
                `INSERT INTO workspaces (id , name , owner_id , slug , subscriptionTier , status , createdAt)
                VALUES ($1 , $2 , $3 , $4 , $5, $6 , $7)`,
                [tenantId, data.workspaceName, accountId, slug, 'free', 'active', new Date()]
            );

            logger.info("WorkSpace Created", { tenantId, workspaceName: data.workspaceName });



            const payload: JWTPayload = {
                userId: accountId,
                tenantId: tenantId,
                email: data.email,
                role: 'owner',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
            };


            const accessToken = JWTUtils.generateAccessToken(payload);
            const refreshToken = JWTUtils.generateRefreshToken(accountId, tenantId);


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
        } catch (error) {
            logger.error('Registration failed', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;

        }
    }


    static async login(data: { email: string; password: string }) {
        try {
            if (!validators.isValidEmail(data.email)) {
                throw new ValidationError('Invalid email')
            }
            const accounts = await database.query(
                'public',
                'SELECT id , password_hash FROM accounts WHERE email = $1',
                [data.email]
            );

            if (accounts.rows.length === 0) {
                throw new ValidationError('Invalid email or password');
            }

            const account = accounts.rows[0]


            const isPasswordValid = await PasswordUtils.verifyPassword(data.password, account.password_hash);
            if (!isPasswordValid) {
                throw new ValidationError('Invalid email or password');
            }

            const workspaces = await database.query(
                'public',
                'SELECT id FROM workspaces WHERE owner_id = $1 LIMIT 1',
                [account.id]
            );
            if (workspaces.rows.length === 0) {
                throw new Error('User has no workspace');
            }

            const tenantId = workspaces.rows[0].id;
            const payload: JWTPayload = {
                userId: account.id,
                tenantId: tenantId,
                email: data.email,
                role: 'owner',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
            };
            const accessToken = JWTUtils.generateAccessToken(payload);
            const refreshToken = JWTUtils.generateRefreshToken(account.id, tenantId);

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


        } catch (error) {
            logger.error('Login failed', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;

        }

    }

    static async refreshToken(refreshToken: string) {
        try {
            // Step 1: Verify refresh token
            const payload = JWTUtils.verifyRefreshToken(refreshToken);

            // Step 2: Generate new access token
            const newPayload: JWTPayload = {
                userId: payload.userId,
                tenantId: payload.tenantId,
                email: '', // Get from DB if needed
                role: 'owner',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
            };

            const accessToken = JWTUtils.generateAccessToken(newPayload);

            logger.info('Token refreshed', { userId: payload.userId });

            return {
                success: true,
                data: {
                    token: accessToken,
                },
            };
        } catch (error) {
            logger.error('Token refresh failed', {
                error: error instanceof Error ? error.message : String(error),
            });
            throw error;
        }
    }
}
