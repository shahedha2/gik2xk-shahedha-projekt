const { Sequelize } = require('sequelize');

// Anslut till SQLite-databas 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/webbshop.sqlite'  // databasen sparas här
});

module.exports = sequelize;
