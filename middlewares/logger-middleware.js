const winston = require('winston');
const { v4: uuidv4 } = require('uuid');

//Use winston to print format logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.metadata.correlationId}] - ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

const loggerError = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.metadata.correlationId}] - ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

//Redefine function console.log to use winston
console.log = logger.info.bind(logger);
console.error = loggerError.error.bind(loggerError);

/**
 * Middleware to assign a correlationalId in each request to control the all traces in a logger dashboard or similar.
 *  @param {object} request Object Express
 *  @param {object} response Object Express
 *  @param {function} next Function Express
 */
const correlationalIdMiddleware = (req, res, next) => {
  req.correlationId = uuidv4();
  logger.info(`New request with this correlationalId: ${req.correlationId}`, { correlationId: req.correlationId });
  next();
};

module.exports = correlationalIdMiddleware;
