require('dotenv').config()
const PORT = process.env.NODE_PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = require('./src/server');

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log('Server is running on Port', PORT);
});
