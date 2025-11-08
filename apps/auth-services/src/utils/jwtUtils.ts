import jwt from 'jsonwebtoken'
import { JWTPayload } from '@arc/shared-types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';


export class JWTUtils{

    static generateAccessToken(payload : JWTPayload): string {
        return jwt.sign(payload , JWT_SECRET );
    }
    // refresh token 
    static generateRefreshToken(userId : string , tenantId: string ): string {
        const iat = Math.floor(Date.now() / 1000);
      const exp = iat + (7 * 24 * 60 * 60); // 7 days in seconds
        return  jwt.sign(
            {userId , tenantId , type: 'refresh', iat, exp},
            REFRESH_SECRET,
            
        );
    } 

    static verifyRefreshToken(token: string): any {
        try {
            return jwt.verify(token , REFRESH_SECRET)
        } catch (error) {
            throw new Error('Invalid or expired refresh token ')
            
        }
    }

    static verifyAccessToken(token: string): any{
        try {
             return jwt.verify(token ,JWT_SECRET)
        } catch (error) {
            throw new Error('Invalid or expired access token ')
            
        }
    }
    
}