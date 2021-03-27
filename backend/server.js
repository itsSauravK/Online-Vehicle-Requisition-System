// Require dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Setup server
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
