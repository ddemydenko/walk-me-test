const mockDb = require('../db/products.json');
class Product {
  async getById(req) {
    const { params } = req;
    return mockDb[params.id];
  }

  noDataHandler(){
    const err = new Error('product does not exist');
    err.status = 404;
    throw err;
  }
}

module.exports = Product;
