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

module.exports = router;
