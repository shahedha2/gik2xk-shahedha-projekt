const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cart = sequelize.define('Cart', {
  payed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = Cart;
