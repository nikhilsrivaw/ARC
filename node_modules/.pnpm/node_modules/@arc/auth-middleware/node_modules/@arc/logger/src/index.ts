import { LoggerConfig, LogEntry } from '@arc/shared-types'
class Logger {
    private config: LoggerConfig;

    private logLevelPriority: Record<string, number> = {
        ERROR: 3,
        WARN: 2,
        INFO: 1,
        DEBUG: 0,
    };

    constructor(config: LoggerConfig) {
        this.config = {
            environment: 'development',
            enableConsole: true,
            enableFile: false,
            ...config,
        }
    };

    private log(level: string, message: string, data?: any): void {
        if (this.logLevelPriority[level] >= this.logLevelPriority[this.config.logLevel]) {
            const logEntry: LogEntry = {
                timestamp: new Date().toISOString(),
                level: level,
                message: message,
                service:  this.config.serviceName,
                data: data
            }

            if (this.config.enableConsole) {
                console.log(JSON.stringify(logEntry));
            }


        }
    }

    debug(message: string, data?: any): void {
        this.log('DEBUG', message, data)
    }
    info(message: string, data?: any): void {
        this.log('INFO', message, data)
    }

    warn(message: string, data?: any): void {
        this.log('WARN', message, data)
    }

    error(message: string, data?: any): void {
        this.log('ERROR', message, data)
    }
}

export default Logger;