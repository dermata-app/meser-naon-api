const Express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const Raven = require('raven');
const config = require('./config');
const log = require('./src/helpers/Logger');

// Setup Express
global.app = Express();
// Setup Mongodb
require('./src/helpers/mongodb');
// Setup sentry logger
Raven.config(process.env.SENTRY_KEY).install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());
// Optional fallthrough error handler

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.disable('x-powered-by');
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

require('./src/routes')();

app.listen(config.port, error => {
  if (!error) {
    log.info(`Ready running on port http://localhost:${config.port}`);
  }
});

// ups
process.on('uncaughtException', err => {
  log.error('uncaughtException', err.stack);
  process.exit();
});

module.exports = app;
