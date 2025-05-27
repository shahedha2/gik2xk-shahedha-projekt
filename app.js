
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Exempel på route
app.get('/', (req, res) => {
  res.send('Webbshop-backend är igång!');
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
