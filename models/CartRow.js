const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CartRow = sequelize.define('CartRow', {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = CartRow;
