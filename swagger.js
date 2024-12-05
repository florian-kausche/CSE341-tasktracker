const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');

const server = express();

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Task Tracker API',
      version: '1.0.0',
      description: 'API for managing tasks',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust this path as needed
  apis: ['./controllers/*.js'], // Adjust this path to point to your controller files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
