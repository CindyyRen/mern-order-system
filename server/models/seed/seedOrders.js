import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../Order.js'; // 请根据你的项目结构调整路径
import fs from 'fs';

dotenv.config();
console.log('✅ 当前 MONGO_URI 是：', process.env.MONGO_URI); // ⬅️ 必加调试
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // 先删除已有订单数据
    await Order.deleteMany({});
    console.log('旧订单数据已删除');

    // 读取 mockOrders.json
    const rawData = fs.readFileSync('../../data/mockOrders.json', 'utf-8');
    const orders = JSON.parse(rawData);

    // 插入新订单
    await Order.insertMany(orders);
    console.log(`✅ 成功插入 ${orders.length} 条订单`);

    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB 操作失败:', err);
    process.exit(1);
  }
}

seed();
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log('✅ MongoDB connected');

//     // 删除已有数据
//     await Order.deleteMany({});

//     // 插入新的数据
//     await Order.insertMany(tags);

//     // 查询插入的数据
//     const insertedTags = await MenuTag.find();
//     console.log('Tags in database:', insertedTags);

//     console.log('✅ Tags seeded!');
//     process.exit();
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection failed:', err);
//     process.exit(1);
//   });
