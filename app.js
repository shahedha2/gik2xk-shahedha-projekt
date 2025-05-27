const express = require('express');
const cors = require('cors');



const sequelize = require('./database');
const User = require('./models/User');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);


app.get('/', (req, res) => {
  res.send('Webbshop-backend är igång!');
});

// Synka databas
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Databasen är synkroniserad');
  })
  .catch((err) => {
    console.error('Fel vid databas-synk:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
