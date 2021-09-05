const app = require('../src/server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

describe('first test', () => {
  test('Get customer by id', async () => {
    const response = await request.get('/customers/13');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 'age': '27', 'id': '13', 'name': 'Bob' });
    return Promise.resolve();
  });

  test('customers/id endpoint should return 404 if customer not found', async () => {
    const res = await request.get('/customers/wrongId');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: {
        status: 404,
        message: 'customer does not exist'
      }
    });
  });

  test('Get product by id', async () => {
    const response = await request.get('/products/99');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 'id': '993', 'name': 'Heinz', 'price': 221.00 });
  });

  test('products/id endpoint should return 404 if products not found', async () => {
    const res = await request.get('/products/wrongId');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: {
        status: 404,
        message: 'product does not exist'
      }
    });
  });

});
