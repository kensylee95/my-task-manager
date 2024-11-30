// // backend/models/User.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const User = sequelize.define('User', {
//   id: { 
//     type: DataTypes.INTEGER, 
//     primaryKey: true, 
//     autoIncrement: true 
//   },
//   full_name: { 
//     type: DataTypes.STRING(100), 
//     allowNull: false 
//   },
//   gender: { 
//     type: DataTypes.STRING(100), 
//     allowNull: false 
//   },
//   contact: { 
//     type: DataTypes.STRING(15) 
//   },
//   email: { 
//     type: DataTypes.STRING(100), 
//     allowNull: false, 
//     unique: true 
//   },
//   user_id: { 
//     type: DataTypes.STRING(100), 
//     allowNull: false 
//   },
//   password: { 
//     type: DataTypes.STRING(255), 
//     allowNull: false 
//   },
//   created_at: { 
//     type: DataTypes.DATE,           // Updated from TIMESTAMP to DATE
//     defaultValue: DataTypes.NOW      // Default to the current timestamp
//   }
// }, {
//   tableName: 'user_account',
//   timestamps: false // Disable Sequelize's automatic timestamps
// });

// module.exports = User;

// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  full_name: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  gender: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  contact: { 
    type: DataTypes.STRING(15), 
    allowNull: true // Made optional
  },
  email: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true 
  },
  user_id: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true, // Ensure uniqueness
    validate: {
      notEmpty: true, // Ensure `user_id` is not empty
    },
  },
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  }
}, {
  tableName: 'user_account',
  timestamps: true, // Enable Sequelize timestamps
  createdAt: 'created_at', // Rename Sequelize's timestamps
  updatedAt: false // Disable `updatedAt` since it's not needed
});

module.exports = User;

