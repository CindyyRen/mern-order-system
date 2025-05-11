import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// 获取菜单项列表
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error });
  }
});

export default router;
