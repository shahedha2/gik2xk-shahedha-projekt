const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { Rating } = require('../models/associations');

// Hämta alla produkter
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Något gick fel' });
  }
});


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

// Lägg till betyg på en produkt
router.post('/:id/addRating', async (req, res) => {
  try {
    const { rating, userId } = req.body;
    const productId = req.params.id;
    const newRating = await Rating.create({ rating, productId, userId });
    res.status(201).json(newRating);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte lägga till betyg' });
  }
});

// Hämta alla betyg för en produkt
router.get('/:id/ratings', async (req, res) => {
  try {
    const productId = req.params.id;
    const ratings = await Rating.findAll({ where: { productId } });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta betyg' });
  }
});

// Hämta snittbetyg för en produkt
router.get('/:id/averageRating', async (req, res) => {
  try {
    const productId = req.params.id;
    const ratings = await Rating.findAll({ where: { productId } });
    if (ratings.length === 0) return res.json({ average: null });
    const average =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    res.json({ average });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta snittbetyg' });
  }
});



module.exports = router;