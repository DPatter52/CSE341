const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'CSE341 Library App',
      description: 'This API is used to simulate manipulating data from a database in a real-life situation.',
    },
    host: 'cse341render.onrender.com',
    schemes: ['https'],
};
  
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)