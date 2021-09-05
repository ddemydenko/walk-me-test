const PORT = Number(process.env.NODE_PORT);
const HOST = process.env.NODE_HOST;

const axios = require('axios');
const server = require('../../src/server');
const app = server.listen(Number(process.env.NODE_PORT));


describe('Multiple endpoint', () => {
  afterAll(()=> {
    app.close();
  })

  test('multiple routes', async () => {
    const response = await axios.get(`http://${HOST}:${PORT}/multiple/?bob=/customers/13&alice=/customers/25&ketchup=/products/993&mustard=/products/90`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      'alice': {
        'data': {
          'age': '18',
          'id': '25',
          'name': 'Alice'
        }
      },
      'bob': {
        'data': {
          'age': '27',
          'id': '13',
          'name': 'Bob'
        }
      },
      'ketchup': {
        'error': {
          'response': {
            'message': 'product does not exist'
          },
          'status': 404
        }
      },
      'mustard': {
        'error': {
          'response': {
            'message': 'product does not exist'
          },
          'status': 404
        }
      }
    });
  });

});
