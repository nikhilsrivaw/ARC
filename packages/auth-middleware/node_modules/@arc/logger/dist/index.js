"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(config) {
        this.logLevelPriority = {
            ERROR: 3,
            WARN: 2,
            INFO: 1,
            DEBUG: 0,
        };
        this.config = {
            environment: 'development',
            enableConsole: true,
            enableFile: false,
            ...config,
        };
    }
    ;
    log(level, message, data) {
        if (this.logLevelPriority[level] >= this.logLevelPriority[this.config.logLevel]) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                level: level,
                message: message,
                service: this.config.serviceName,
                data: data
            };
            if (this.config.enableConsole) {
                console.log(JSON.stringify(logEntry));
            }
        }
    }
    debug(message, data) {
        this.log('DEBUG', message, data);
    }
    info(message, data) {
        this.log('INFO', message, data);
    }
    warn(message, data) {
        this.log('WARN', message, data);
    }
    error(message, data) {
        this.log('ERROR', message, data);
    }
}
exports.default = Logger;
//# sourceMappingURL=index.js.map