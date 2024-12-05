const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express(); // Assuming server is express

// Swagger Autogen Config
const doc = {
  info: {
    title: 'Task Tracker API',
    description: 'API for managing Tasks',
  },
  host: process.env.SWAGGER_HOST || 'https://cse341-tasktracker.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/posts.js']; // Adjust the path to match your routes

// Generate Swagger output file
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Ensure Swagger UI serves the generated output
  const swaggerDocument = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

// Start server after Swagger is ready
server.listen(3000, () => {
  console.log('Server running on port 3000');
});