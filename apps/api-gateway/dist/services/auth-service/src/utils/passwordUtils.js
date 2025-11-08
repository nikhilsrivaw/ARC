"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUtils = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
class PasswordUtils {
    static async hashPassword(password) {
        return await bcrypt_1.default.hash(password, SALT_ROUNDS);
    }
    static async verifyPassword(password, hash) {
        return await bcrypt_1.default.compare(password, hash);
    }
    static validatePasswordStrength(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }
}
exports.PasswordUtils = PasswordUtils;
//# sourceMappingURL=passwordUtils.js.map