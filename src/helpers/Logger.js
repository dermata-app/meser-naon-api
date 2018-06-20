const winston = require('winston');
require('winston-daily-rotate-file');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../log');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      filename: 'app-info.log',
      level: 'info',
      dirname: dir,
      maxsize: 20971520, // 20MB
      maxFiles: 25,
      datePattern: 'YYYY-MM-DD'
    }),
    new winston.transports.DailyRotateFile({
      filename: 'app-error.log',
      level: 'error',
      dirname: dir,
      maxsize: 20971520, // 20MB
      maxFiles: 25,
      datePattern: 'YYYY-MM-DD H:mm:ss'
    })
  ]
});

module.exports = Logger;
