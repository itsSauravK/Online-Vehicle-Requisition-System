// Require dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const {
  routeNotFound,
  errorHandler,
} = require('./middleware/error.middleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Setup server
const app = express();
app.use(express.json());

// Mount routers
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/orders', require('./routes/order.routes'));

// Documents upload
const upload = require('./middleware/upload.middleware');
const asyncHandler = require('express-async-handler');

app.post(
  '/api/upload',
  upload.single('document'),
  asyncHandler((req, res) => {
    res.json({ file: req.file.path });
  })
);

// Error middlewares
app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
