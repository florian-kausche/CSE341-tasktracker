const express = require('express');
const swaggerDocs = require('/swagger'); // Path to the configuration file
const swaggerUi = require('swagger-ui-express');
const postsRoutes = require('./routes/posts');

const server = express();

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust this path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use your routes
app.use('/api', postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
 
});
