const { DataTypes } = require('squelize');
const sequelize = require('../config/db');

const Vendor = sequelize.define('Vendor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Catering', 'Decor', 'Photography', 'Entertainment', 'Venue', 'Others'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  contact: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  },
  years_of_experience:{
    type: DataTypes.INTEGER
  },
  location:{
    type: DataTypes.STRING
  },
  portfolio:{
    type: DataTypes.STRING
  },
  portfolio_link: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Vendor;