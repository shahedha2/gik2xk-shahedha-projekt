const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Lägg till en ny användare
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await User.create({
      first_name,
      last_name,
      email,
      password
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte skapa användare' });
  }
});

module.exports = router;
