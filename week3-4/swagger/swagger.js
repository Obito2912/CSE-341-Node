const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpoints = ['../routes/index.js'];

const doc = {
  info: {
    title: 'RPG and Battle Royale API',
    description: 'This API allows to retrieve RPG and Battle Royale game info',
  },
  host: 'localhost:3003',
  schemes: ['https', 'http'],
};

swaggerAutogen(outputFile, endpoints, doc);
