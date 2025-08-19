import express, { json } from 'express';
import { connect } from 'mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import menuItemsRouter from './routes/menuItems.js';
import categoriesRouter from './routes/categories.js'; // 引入分类路由
import ordersRouter from './routes/orders.js'; // 引入订单路由
import authRoutes from './routes/auth.js';
import { setupSwagger } from './swagger.js'; // 上一步新建的文件
import exportOrdersRouter from './routes/exportOrders.js';
import Order from './models/Order.js';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
// 挂载 Swagger UI
setupSwagger(app);
// 使用路由
app.use('/api/menu-items', menuItemsRouter); // 将 menuItems 路由挂载到 /api/menu-items
app.use('/api/categories', categoriesRouter); // 将 categories 路由挂载到 /api/categories
app.use('/api/orders', ordersRouter); // 将 orders 路由挂载到 /api/orders
app.use('/api', authRoutes);
app.get('/test-route', (req, res) => {
  console.log('测试路由 /test-route 被访问');
  res.send('Hello Test');
});
app.use('/api/orders-export', exportOrdersRouter); // 新接口，不受保护

connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:');
    console.error(err);
  });
// // 捕获未知错误，防止服务器挂掉
// mongoose.connection.once('open', () => {
//   console.log('MongoDB 连接已打开');
// });
// const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/你的数据库名';

// async function updateTableNumbers() {
//   try {
//     await mongoose.connect(uri);
//     console.log('MongoDB connected');

    // const orders = await Order.find({}, '_id');

    // for (const order of orders) {
    //   const tableNum = Math.floor(Math.random() * 30) + 1;
    //   const tableNumStr = tableNum.toString().padStart(2, '0'); // 1 -> '01', 2 -> '02'
    //   await Order.updateOne(
    //     { _id: order._id },
    //     { $set: { 'customer_info.table_number': tableNumStr } }
    //   );
    // }

//     console.log('所有订单桌号已更新完成');
//     await mongoose.disconnect();
//   } catch (err) {
//     console.error('更新桌号失败：', err);
//     await mongoose.disconnect();
//   }
// }

// updateTableNumbers();

//更新print_status
// mongoose.connection.once('open', () => {
//   console.log('MongoDB 连接已打开');
// });
// const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/你的数据库名';

// async function updateTableNumbers() {
//   try {
//     await mongoose.connect(uri);
//     console.log('MongoDB connected');

//     await Order.updateMany(
//       { 'items.print_status': { $exists: false } }, // 只针对老订单
//       {
//         $set: {
//           'items.$[].print_status': 'printed', // item 状态
//           print_status: 'printed', // 整单状态
//         },
//       }
//     );

//     console.log('所有print_status已更新完成');
//     await mongoose.disconnect();
//   } catch (err) {
//     console.error('更新print_status失败：', err);
//     await mongoose.disconnect();
//   }
// }

// updateTableNumbers();
// async function initOldOrdersPrintStatus() {
//   try {
//     await mongoose.connect(uri);
//     console.log('MongoDB 已连接');
//     await Order.updateMany(
//       {},
//       {
//         $set: {
//           'items.$[].print_status': 'printed',
//           print_status: 'printed',
//         },
//       }
//     );

//     await mongoose.disconnect();
//     console.log('MongoDB 已断开');
//   } catch (err) {
//     console.error('初始化老订单打印状态失败：', err);
//     await mongoose.disconnect();
//   }
// }

// // 执行
// initOldOrdersPrintStatus();
