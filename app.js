const express = require('express');
const cors = require('cors');

const sequelize = require('./database');
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

require('./models/associations');

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);



// Basrout för test
app.get('/', (req, res) => {
  res.send('Webbshop-backend är igång!');
});

// Synka databas
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Databasen är synkroniserad');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servern körs på http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Fel vid databas-synk:', err);
  });


