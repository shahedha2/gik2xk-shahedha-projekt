const express = require('express');
const router = express.Router();

const { User } = require('../models/associations');

// Route för att skapa en användare
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte skapa användare' });
  }
});

module.exports = router;
