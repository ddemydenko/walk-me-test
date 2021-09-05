const multipleHandlerApp = require('./multiple-handler-app');
const express = require('express');
const app = express();

const { router } = require('./routes');

app.use('/', router);
app.use('/multiple', multipleHandlerApp);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status);
  res.send({
    error: {
      status: err.status,
      message: err.message
    }
  });
});

module.exports = app;
