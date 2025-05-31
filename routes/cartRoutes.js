const express = require('express');
const router = express.Router();

const { User, Cart, Product, CartRow } = require('../models/associations');

// Lägg till produkt i varukorg
router.post('/addProduct', async (req, res) => {
  const { userId, productId, amount } = req.body;

  try {
    // Hämta användaren
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Användare hittades inte' });

    // Hämta senaste obetalda varukorg (eller skapa ny)
    let cart = await Cart.findOne({ where: { userId: user.id, payed: false } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    // Lägg till raden i varukorgen
    const row = await CartRow.create({
      cartId: cart.id,
      productId,
      amount
    });

    res.status(201).json(row);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Hämta senaste obetalda varukorg för en användare inkl. produkter
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

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

    // Plocka ut relevant info om produkter och antal
    const cartInfo = cart.CartRows.map(row => ({
      product: row.Product,
      amount: row.amount
    }));

    res.json({ cartId: cart.id, products: cartInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
