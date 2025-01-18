const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const setupSwagger = (app) => {
  // Swagger options
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'School Management System API',
        version: '1.0.0',
        description: 'API for Displaying student records',
      },
      // servers: [
      //   {
      //     url: 'https://cse341-tasktracker.onrender.com',
      //   },
      // ],
    },
    apis: ['./routes/index.js', './controllers/record.js'], // Adjust this path as needed
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
