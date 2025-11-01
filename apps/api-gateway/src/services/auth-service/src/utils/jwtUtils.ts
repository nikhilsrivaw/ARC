import jwt from 'jsonwebtoken'
import { JWTPayload } from '@arc/shared-types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const ACCESS_TOKEN_EXPIRY = process.env.JWT_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';

export class JWTUtils{

    static generateAccessToken(payload : JWTPayload): string {
        return jwt.sign(payload , JWT_SECRET , {
            expiresIn : ACCESS_TOKEN_EXPIRY,
        });
    }
    // refresh token 
    static generateRefreshToken(userId : string , tenantId: string ): string {
        return  jwt.sign(
            {userId , tenantId , type: 'refresh'},
            REFRESH_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRY }
        )
    } 

    static verifyRefreshToken(token: string): any {
        try {
            return jwt.verify(token , REFRESH_SECRET)
        } catch (error) {
            throw new Error('Invalid or expired refresh token ')
            
        }
    }
    
}