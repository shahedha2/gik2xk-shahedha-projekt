const express = require('express');
const router = express.Router();

const { User } = require('../models/associations');

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

module.exports = router;