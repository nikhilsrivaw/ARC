"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
class JWTUtils {
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
    }
    // refresh token 
    static generateRefreshToken(userId, tenantId) {
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + (7 * 24 * 60 * 60); // 7 days in seconds
        return jsonwebtoken_1.default.sign({ userId, tenantId, type: 'refresh', iat, exp }, REFRESH_SECRET);
    }
    static verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token ');
        }
    }
    static verifyAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (error) {
            throw new Error('Invalid or expired access token ');
        }
    }
}
exports.JWTUtils = JWTUtils;
//# sourceMappingURL=jwtUtils.js.map