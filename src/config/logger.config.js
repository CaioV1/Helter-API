const { createLogger, format, transports, config } = require("winston");

const { combine, timestamp, prettyPrint } = format;

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: new Date().toString()
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: new Date().toString()
  },
};

const loggerInfo = {
  format: combine(
    timestamp(),
    prettyPrint(),
  ),
  levels: config.npm.levels,
  transports: [
    new transports.File(options.file)
  ],
  exitOnError: false,
}

if(process.env.NODE_ENV != "test") 
  loggerInfo.transports.push(new transports.Console(options.console));

module.exports = createLogger(loggerInfo);