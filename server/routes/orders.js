import express from 'express';
import Order from '../models/Order.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
dayjs.extend(utc);
dayjs.extend(timezone);

const router = express.Router();
router.use(authMiddleware);
router.get('/', async (req, res) => {
  try {
    const {
      date,
      search,
      page = 1,
      limit = 15,
      pageSize,
      sortField = 'created_at',
      sortOrder = 'desc',
    } = req.query;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(pageSize || limit); // 兼容两种写法
    const skip = (parsedPage - 1) * parsedLimit;

    const query = {};
    if (date && date !== 'all') {
      // 有具体日期 → 查那天
      const start = dayjs.tz(`${date} 00:00:00`, 'Australia/Sydney').toDate();
      const end = dayjs.tz(`${date} 23:59:59.999`, 'Australia/Sydney').toDate();
      query.created_at = { $gte: start, $lte: end };
    } else if (!date) {
      // 没传 date → 默认今天
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      query.created_at = { $gte: today, $lt: tomorrow };
    }
    // date === 'all' 时 → 不加任何日期条件，查所有

    // ===== 搜索条件 =====
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { 'customer_info.name': regex },
        { 'customer_info.phone': regex },
        { 'customer_info.table_number': regex },
        { dining_type: regex },
        { status: regex },
        { source: regex },
      ];
    }
    const allowedSortFields = [
      'created_at',
      'status',
      'total_price',
      'dining_type',
      'source',
      'customer_info.table_number', // 如果你支持嵌套字段排序
      'payment.paid', // 加上这一项
    ];

    const safeSortField = allowedSortFields.includes(sortField)
      ? sortField
      : 'created_at';

    const safeSortOrder = sortOrder === 'asc' ? 1 : -1;
    // ===== 排序条件 =====
    const sort = {};
    sort[safeSortField] = safeSortOrder;

    const [orders, totalCount] = await Promise.all([
      Order.find(query).sort(sort).skip(skip).limit(parsedLimit),
      Order.countDocuments(query),
    ]);

    res.status(200).json({ orders, totalCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      items = [],
      customer_info = {},
      source,
      placed_by,
      placed_by_user, // ObjectId or null
      tax = 0,
      service_fee = 0,
      discount = 0,
      dining_type,
      delivery_info = {},
      payment = {},
      notes,
      customer_notes,
    } = req.body;

    // ===== 校验逻辑 =====
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: '订单不能为空' });
    }

    if (!['customer', 'staff'].includes(placed_by)) {
      return res.status(400).json({ message: '下单来源不合法' });
    }

    if (
      ![
        'customer_web',
        'staff_web',
        'phone_order',
        'uber_eats',
        'doordash',
        'panda',
        'menulog',
      ].includes(source)
    ) {
      return res.status(400).json({ message: '订单来源不合法' });
    }

    if (!['dine_in', 'takeaway', 'delivery'].includes(dining_type)) {
      return res.status(400).json({ message: '就餐类型不合法' });
    }

    // ===== 每个 item 自动计算 subtotal =====

    const processedItems = items
      .map((item) => {
        const { price, quantity } = item;
        if (
          typeof price !== 'number' ||
          typeof quantity !== 'number' ||
          quantity < 1
        ) {
          console.warn('无效 item，跳过:', item);
          return null; // 或者给默认值
        }
        return { ...item, subtotal: price * quantity };
      })
      .filter(Boolean); // 过滤掉无效 item

    // ===== 创建订单对象 =====
    const newOrder = new Order({
      items: processedItems,
      customer_info,
      source,
      placed_by,
      placed_by_user: placed_by === 'staff' ? placed_by_user : null,
      tax,
      service_fee,
      discount,
      dining_type,
      delivery_info,
      payment,
      notes,
      customer_notes,
    });

    await newOrder.save();
    // 然后再入队打印任务
    // 使用 MongoDB 批量更新 item.print_status + 入队
    await Order.updateOne(
      { _id: newOrder._id },
      { $set: { 'items.$[].print_status': 'printing' } }
    );
    newOrder.items.forEach((item) => {
      const printer = selectPrinter(item.category);
      enqueuePrint(printer, item, newOrder._id.toString());
    });

    return res.status(201).json({
      message: '订单创建成功',
      order: newOrder,
    });
  } catch (error) {
    console.error('订单创建失败:', error);
    return res.status(500).json({
      message: '服务器错误',
      error: error.message,
    });
  }
});
// 👇 添加到 order routes 中
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowedFields = ['status', 'remarks', 'dining_type'];
    const updateData = {};

    // 只允许更新指定字段
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: '订单未找到' });
    }

    return res.json(updatedOrder);
  } catch (error) {
    console.error('更新订单失败:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

export default router;
