const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const doc = {
  info: {
    title: 'posts API',
    description: 'API for managing posts'
  },
  host: process.env.SWAGGER_HOST || 'cse341-project-fzn3.onrender.com', // Dynamic host
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/posts.js'];  // Path to your route files

swaggerAutogen(outputFile, endpointsFiles, doc);

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Information',
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Use Swagger UI
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 