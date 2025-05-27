const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Hämta alla produkter
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Något gick fel' });
  }
});

module.exports = router;

// Lägg till en ny produkt
router.post('/', async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      imageUrl
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte skapa produkt' });
  }
});
