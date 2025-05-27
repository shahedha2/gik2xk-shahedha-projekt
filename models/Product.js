const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

module.exports = Product;
