const express = require('express');
const mongodb = require('./data/database'); // Import the 'database' module
const bodyParser = require('body-parser'); // Optional, if required
require('dotenv').config(); // Load environment variables (optional if using .env)

const app = express();

// Use Express's built-in JSON parser middleware (body-parser is redundant here)
app.use(express.json());

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
      console.log(`Server is running on http://0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit with failure if the database doesn't connect
  }
};

startServer();
