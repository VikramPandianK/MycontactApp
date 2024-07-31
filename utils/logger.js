const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;


const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    format.json(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.File({ filename: 'logs/info.log', level: 'info' }),
    new transports.Console()
  ]
});

module.exports = logger;