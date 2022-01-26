const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;


interface MyFormat {
    level: string,
    label: string,
    message: string,
    timestamp: number
}
const myFormat = printf( ({ level, message, label, timestamp }: MyFormat ) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }), 
]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}




