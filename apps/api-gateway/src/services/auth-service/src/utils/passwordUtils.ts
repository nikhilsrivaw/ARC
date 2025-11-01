import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;



export class PasswordUtils {
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    static validatePasswordStrength(password: string): boolean{
          const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
          return regex.test(password);
    }
}
