const mockDb = require('../db/customers.json');
class Customer {
  async getById(req) {
    const { params } = req;
    return mockDb[params.id];
  }

  noDataHandler(){
    const err = new Error('customer does not exist');
    err.status = 404;
    throw err;
  }
}

module.exports = Customer;
