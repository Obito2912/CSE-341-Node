const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpoints = ['../routes/index.js'];

const doc = {
  info: {
    title: 'RPG and Battle Royale API',
    description: 'This API allows to retrieve RPG and Battle Royale game info',
  },
  host: 'https://cse-341-node-1.onrender.com',
  schemes: ['https'],
};

swaggerAutogen(outputFile, endpoints, doc);
