import { JWTPayload } from '@arc/shared-types';
export declare class JWTUtils {
    static generateAccessToken(payload: JWTPayload): string;
    static generateRefreshToken(userId: string, tenantId: string): string;
    static verifyRefreshToken(token: string): any;
    static verifyAccessToken(token: string): any;
}
//# sourceMappingURL=jwtUtils.d.ts.map