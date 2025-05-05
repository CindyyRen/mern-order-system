const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem').default;

router.get('/', async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

router.post('/seed', async (req, res) => {
  await MenuItem.deleteMany();
  await MenuItem.insertMany(req.body);
  res.send('Menu seeded!');
});

module.exports = router;
