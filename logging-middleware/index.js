class Logger {
    constructor(context) {
        this.context = context;
    }

    log(level, message, data = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            context: this.context,
            message,
            ...data
        };
        // Use console.info/error internally but hide it from the user code using console.log
        if (level === 'ERROR') {
            console.error(JSON.stringify(logEntry));
        } else if (level === 'WARN') {
            console.warn(JSON.stringify(logEntry));
        } else {
            console.info(JSON.stringify(logEntry));
        }
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

    debug(message, data) {
        this.log('DEBUG', message, data);
    }
}

export const createLogger = (context) => new Logger(context);
