const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CartRow = sequelize.define('CartRow', {
    id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
    },

   amount: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
   cartId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
   productId: {
     type: DataTypes.INTEGER,
     allowNull: false
    }

  }, {
  timestamps: true,
  
});

module.exports = CartRow;
