import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

/**
 * @swagger
 * /menu-items:
 *   get:
 *     summary: 获取所有菜单项
 *     responses:
 *       200:
 *         description: 成功返回菜单项数组
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *
 *   post:
 *     summary: 创建一个新的菜单项
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: 菜单项创建成功
 */

// 获取菜单项列表
// router.get('/', async (req, res) => {
//   try {
//     const menuItems = await MenuItem.find();
//     console.log(menuItems);

//     res.status(200).json(menuItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch menu items', error });
//     console.log(error);
//   }
// });

// export default router;

router.get('/', async (req, res) => {
  console.log('📥 [GET] /api/menu-items 被访问');

  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems || []);
  } catch (error) {
    console.error('❌ 获取菜单项出错:', error);
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
});

export default router;
