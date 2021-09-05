const router = require('express').Router();
const Customer = require('./services/customer');
const Product = require('./services/product');
const customer = new Customer();
const product = new Product();

const customerRoutes = [
  {
    method: 'get',
    path: '/customers/:id',
    handler: customer.getById,
    noDataHandler: customer.noDataHandler
  }
];

const productRoutes = [
  {
    method: 'get',
    path: '/products/:id',
    handler: product.getById,
    noDataHandler: product.noDataHandler
  },

];

const initRoutes = ({ method, path, handler, noDataHandler }) => {


  const mainHandler = (req, res, next) => {
    const result = handler(req);
    result.then(data => {
      if (!data) {
        next(noDataHandler(req));
        return;
      }
      res.send(data);
      next();
    })
    .catch(err => {
      next(err);
    });
  };

  return router[method](path, mainHandler);
};

customerRoutes.map(initRoutes);
productRoutes.map(initRoutes);

module.exports = {
  router
};
