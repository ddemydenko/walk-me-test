const PORT = Number(process.env.NODE_PORT);
const HOST = process.env.NODE_HOST;
const axios = require('axios');
const express = require('express');
const app = express();


app.use('/', (req, res, next) => {
  const { query } = req;
  const queryKeys = Object.keys(query);

  const promises = Object.values(query).map((path) => {
    return axios({
      method: 'get',
      url: `http://${HOST}:${PORT}${path}`
    });
  });

  const outputData = {};
  Promise.allSettled(promises).then((responses) => {
    responses.forEach((response, ind) => {
      if (response.status === 'fulfilled') {
        outputData[queryKeys[ind]] = { data: response.value.data };
      } else {
        outputData[queryKeys[ind]] = {
          error: {
            status: response.reason.response.status,
            response: {
              message: response.reason.response.data.error.message
            }
          }
        };
      }
    });

    res.send(outputData);
  }).catch((err)=> next(err));
});

module.exports = app;
