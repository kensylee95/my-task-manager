// // backend/server.js
// require('dotenv').config();

// const express = require('express');
// const path = require('path');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');

// const app = express();

// // Middleware setup
// app.use(express.json());
// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());

// // Serve static files from frontend/public
// app.use(express.static(path.join(__dirname, '../frontend/public')));

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// // Fallback route to serve index.html for any unknown routes (for client-side routing)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
// });

// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   const status = err.statusCode || 500;
//   res.status(status).json({
//     message: err.message || 'An unexpected error occurred.',
//     status,
//   });
// });

// // Connect to database and start the server
// const PORT = process.env.PORT || 5000;
// sequelize
//   .sync()
//   .then(() => {
//     console.log('Database synchronized');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to sync database:', err);
//   });


// backend/server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Fallback route to serve index.html for any unknown routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'An unexpected error occurred.',
    status,
  });
});

// Connect to database and start the server
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    await sequelize.sync(); // Sync models with the database
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect or sync database:', err);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

module.exports = app;
