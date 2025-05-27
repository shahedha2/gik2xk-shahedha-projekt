const User = require('./User');
const Cart = require('./Cart');
const Product = require('./Product');
const CartRow = require('./CartRow');

// Relationer
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartRow });
Product.belongsToMany(Cart, { through: CartRow });

module.exports = {
  User,
  Cart,
  Product,
  CartRow
};
