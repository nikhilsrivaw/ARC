export interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    poolMin: number;
    poolMax: number;
    poolIdleTimeout: number;
}
export declare function getDatabaseConfig(): DatabaseConfig;
//# sourceMappingURL=config.d.ts.map