export declare const Helpers: {
    generateRandomString: (length?: number) => string;
    retry: <T>(fn: () => Promise<T>, maxAttempts?: number, delayMs?: number) => Promise<T>;
    isEmpty: (obj: any) => boolean;
    deepClone: <T>(obj: T) => T;
    wait: (ms: number) => Promise<void>;
    getEnv: (key: string, defaultValue?: string) => string;
    isDevelopment: () => boolean;
    isProduction: () => boolean;
};
//# sourceMappingURL=helpers.d.ts.map