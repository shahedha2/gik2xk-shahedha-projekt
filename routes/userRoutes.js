const express = require('express');
const router = express.Router();

const { User, Cart, CartRow, Product } = require('../models/associations');

// Route för att skapa en användare
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte skapa användare' });
  }
});



// Uppdatera användare
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Användare hittades inte' });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte uppdatera användaren' });
  }
});

// Ta bort användare
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Användare hittades inte' });

    await user.destroy();
    res.json({ message: 'Användaren är borttagen' });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte ta bort användaren' });
  }
});

// Hämta alla användare
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta användare' });
  }
});

// Hämta en användares senaste obetalda varukorg och dess produkter
router.get('/:id/getCart', async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({
      where: { userId, payed: false },
      include: [
        {
          model: CartRow,
          include: [{ model: Product }]
        }
      ]
    });

    if (!cart) return res.status(404).json({ error: 'Ingen varukorg hittades' });

    const productsInCart = cart.CartRows.map(row => ({
      product: row.Product,
      amount: row.amount
    }));

    res.json({ cartId: cart.id, products: productsInCart });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta varukorg' });
  }
});

module.exports = router;