const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Rating = sequelize.define('Rating', {
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: { min: 1, max: 5 } 
  }
});

module.exports = Rating;
