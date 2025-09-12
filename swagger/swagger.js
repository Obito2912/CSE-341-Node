const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpoints = ['../routes/index.js'];

const doc = {
  info: {
    title: 'Contacts API',
    description: 'This Contacts API allows to retrieve contacts info',
  },
  host: 'localhost:3003',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpoints, doc);
