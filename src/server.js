
const express = require('express');

const app = express();
// const bodyParser = require('body-parser');
// const middleware = require('swagger-express-middleware');

const { router } = require('./routes');
// const {  setupSwaggerUi, preventShowStackTrace, swaggerDocument, authCheck} = require('./services/Middlware');
// const config = require('./config/migration.json')[process.env.NODE_ENV];


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(setupSwaggerUi(app));

// middleware(swaggerDocument, app, (error, middleWare) => {
//   app.use(
//     middleWare.metadata(),
//     middleWare.CORS(),
//     middleWare.parseRequest(),
//     middleWare.validateRequest()
//   );
//
//   app.use(authCheck());
  app.use('/', router);
//   // app.use(preventShowStackTrace());
// });

app.use((err, req, res, next) => {
  // if (config.logging) {
  //   console.error(err.stack);
  // }
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
