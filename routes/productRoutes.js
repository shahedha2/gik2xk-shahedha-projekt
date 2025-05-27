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

// Uppdatera en produkt
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produkt hittades inte' });

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte uppdatera produkten' });
  }
});

// Ta bort en produkt
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produkt hittades inte' });

    await product.destroy();
    res.json({ message: 'Produkten är borttagen' });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte ta bort produkten' });
  }
});

