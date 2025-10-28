export const Helpers = {
    // generate random strings
    generateRandomString: (length: number = 32): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));

        }
        return result
    },

    // Retry logic for failed operations
    retry: async <T>(
        fn: () => Promise<T>,
        maxAttempts: number = 3,
        delayMs: number = 1000
    ): Promise<T> => {
        let lastError: Error | undefined;
        for (let i = 0; i < maxAttempts; i++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error as Error;
                if (i < maxAttempts - 1) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, delayMs * (i + 1))
                    );
                }
            }
        }
        throw lastError || new Error('All retry attempts failed');
    },


    //Check if object is empty 
    isEmpty: (obj: any): boolean => {
        return (
            obj === null ||
            obj === undefined ||
            (typeof obj === 'object' && Object.keys(obj).length === 0)
        )
    },

     // Deep clone object
    deepClone: <T>(obj: T): T => {
      return JSON.parse(JSON.stringify(obj));
    },


    // Wait for specified milliseconds
    wait: (ms: number): Promise<void> => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    // Get environment variable with default
    getEnv: (key: string, defaultValue?: string): string => {
      return process.env[key] || defaultValue || '';
    },

    // Check if running in development
    isDevelopment: (): boolean => {
      return process.env.NODE_ENV === 'development';
    },

    // Check if running in production
    isProduction: (): boolean => {
      return process.env.NODE_ENV === 'production';
    },




}