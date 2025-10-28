import { LoggerConfig } from '@arc/shared-types';
declare class Logger {
    private config;
    private logLevelPriority;
    constructor(config: LoggerConfig);
    private log;
    debug(message: string, data?: any): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, data?: any): void;
}
export default Logger;
//# sourceMappingURL=index.d.ts.map