"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
exports.Helpers = {
    // generate random strings
    generateRandomString: (length = 32) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    // Retry logic for failed operations
    retry: async (fn, maxAttempts = 3, delayMs = 1000) => {
        let lastError;
        for (let i = 0; i < maxAttempts; i++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (i < maxAttempts - 1) {
                    await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
                }
            }
        }
        throw lastError || new Error('All retry attempts failed');
    },
    //Check if object is empty 
    isEmpty: (obj) => {
        return (obj === null ||
            obj === undefined ||
            (typeof obj === 'object' && Object.keys(obj).length === 0));
    },
    // Deep clone object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },
    // Wait for specified milliseconds
    wait: (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    // Get environment variable with default
    getEnv: (key, defaultValue) => {
        return process.env[key] || defaultValue || '';
    },
    // Check if running in development
    isDevelopment: () => {
        return process.env.NODE_ENV === 'development';
    },
    // Check if running in production
    isProduction: () => {
        return process.env.NODE_ENV === 'production';
    },
};
//# sourceMappingURL=helpers.js.map