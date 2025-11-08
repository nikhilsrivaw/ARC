export declare class PasswordUtils {
    static hashPassword(password: string): Promise<string>;
    static verifyPassword(password: string, hash: string): Promise<boolean>;
    static validatePasswordStrength(password: string): boolean;
}
//# sourceMappingURL=passwordUtils.d.ts.map