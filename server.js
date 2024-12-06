const express = require('express');
const mongodb = require('./data/database'); // Import the 'database' module
require('dotenv').config(); // Load environment variables (optional if using .env)

const app = express();

// Use Express's built-in JSON parser middleware
app.use(express.json());

// Import Swagger setup
const swaggerSetup = require('./swagger');
swaggerSetup(app); // Call the function to set up Swagger

// Middleware for routes defined in './routes'
app.use('/', require('./routes'));

// Get the port from the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Initialize database connection and start the server
const startServer = async () => {
  try {
    // Ensure MongoDB is initialized
    await mongodb.initDb(); // Assuming initDb returns a promise
    app.listen(port, () => {
      console.log(`Server is running and node is running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit with failure if the database doesn't connect
  }
};

startServer();
