const express = require('express');
const router = express.Router();

const { Product, Rating, User } = require('../models/associations');

// Lägg till betyg på en produkt
router.post('/:id/addRating', async (req, res) => {
  try {
    const { rating, userId } = req.body; 
    const productId = req.params.id;

    // Kontrollera att produkten finns
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Produkt hittades inte' });

    const newRating = await Rating.create({ rating, productId, userId });
    res.status(201).json(newRating);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte lägga till betyg' });
  }
});


router.get('/:id/ratings', async (req, res) => {
  try {
    const productId = req.params.id;
    const ratings = await Rating.findAll({ where: { productId } });
    const avg =
      ratings.length > 0
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
        : null;
    res.json({ ratings, average: avg });
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta betyg' });
  }
});

module.exports = router;