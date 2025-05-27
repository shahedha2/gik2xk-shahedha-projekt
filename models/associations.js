const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const CartRow = require('./CartRow');

// Relationer

// En användare (User) kan ha flera varukorgar (Cart)
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// En varukorg (Cart) kan ha flera rader (CartRow)
Cart.hasMany(CartRow, { foreignKey: 'cartId' });
CartRow.belongsTo(Cart, { foreignKey: 'cartId' });

// En produkt (Product) kan förekomma i flera rader (CartRow)
Product.hasMany(CartRow, { foreignKey: 'productId' });
CartRow.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Product,
  Cart,
  CartRow,
};
