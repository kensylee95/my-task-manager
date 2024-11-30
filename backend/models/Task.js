// backend/models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
    allowNull: false,
  },
}, {
  tableName: 'tasks', // Explicitly map the table name
  timestamps: true,   // Automatically handle created_at and updated_at
  createdAt: 'created_at', // Map Sequelize's `createdAt` to `created_at`
  updatedAt: 'updated_at', // Map Sequelize's `updatedAt` to `updated_at`
});

Task.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Task, { foreignKey: 'user_id', sourceKey: 'user_id' });

module.exports = Task;
