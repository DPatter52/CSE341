const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'CSE341 Library App',
      description: 'This API is used to simulate manipulating data from a database in a real-life situation.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};
  
const outputFile = './swagger.json';
const endpointsFiles = ['index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)