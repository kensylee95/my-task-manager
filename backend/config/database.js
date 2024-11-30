// backend/config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false // Disable SQL query logging
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected...'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = sequelize;