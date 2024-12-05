

const swaggerAutogen = require('swagger-autogen')();

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const express = require('express');

const server = express();

// Swagger Autogen Config
const doc = {
  info: {
    title: 'Task Tracker API',
    description: 'API for managing tasks',
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000', // Default to local for development
  schemes: process.env.SWAGGER_SCHEMES?.split(',') || ['https'], // Use 'https' for production
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/posts']; // Adjust to match your routes

// Generate Swagger output file and then start the server
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const swaggerDocument = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at https://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Failed to generate Swagger documentation:', err);
});
