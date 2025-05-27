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
