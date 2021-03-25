// Require dependencies
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Setup server
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
