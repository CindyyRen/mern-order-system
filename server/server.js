import express, { json } from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import menuItemsRouter from './routes/menuItems.js';
import categoriesRouter from './routes/categories.js'; // 引入分类路由
import ordersRouter from './routes/orders.js'; // 引入订单路由
import { setupSwagger } from './swagger.js'; // 上一步新建的文件
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
