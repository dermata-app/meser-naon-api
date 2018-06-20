const http = require('http');

// const debug = require('debug')('app');

module.exports = () => {
  // Craft response.
  function craft(data, message, status) {
    const statusCode = status || 200;

    const response = {
      meta: {
        code: statusCode,
        message: message || http.STATUS_CODES[statusCode]
      }
    };

    if (data != null) response.data = data;

    return response;
  }
  function errorRes(message, status) {
    const statusCode = status || 400;

    const response = {
      errors: {
        message: message || http.STATUS_CODES[statusCode],
        code: statusCode
      }
    };
    return response;
  }

  app.use((req, res, next) => {
    req.api = req.xhr || req.get('Accept').indexOf('html') < 0;

    res.craft = craft;

    res.ok = (data, message, status) => {
      const statusCode = status || 200;
      res.status(statusCode).send(craft(data, message, statusCode));
    };
    res.error = (message, status) => {
      const statusCode = status || 400;
      res.status(statusCode).send(errorRes(message, status));
    };

    next();
  });

  // app.use((req, res, next) => {
  //   const err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  // eslint-disable-next-line
  app.use('/api/v1', require('./api'));
};
