import mongoose from 'mongoose';
import MenuTag from './MenuTag.js'; // 使用 ES Module 的 import
import dotenv from 'dotenv';
dotenv.config();

const tags = [
  { key: 'signature', label: '招牌', icon: '❤️' },
  { key: 'chilli', label: '辣', icon: '🌶️' },
  { key: 'nut', label: '坚果', icon: '🥜' },
  { key: 'egg', label: '蛋', icon: '🥚' },
  { key: 'sesame', label: '芝麻', icon: '🌸' },
  { key: 'lard', label: '猪油', icon: '🥓' },
  { key: 'oyster', label: '蚝油', icon: '🦪' },
  { key: 'vegetarian', label: '素食', icon: '🥬' },
  { key: 'gluten', label: '含面筋', icon: '🌾' },
  { key: 'soy', label: '大豆', icon: '🌱' },
  { key: 'dairy', label: '乳制品', icon: '🥛' },
  { key: 'shellfish', label: '甲壳类', icon: '🦐' },
  { key: 'seafood', label: '海鲜', icon: '🐟' },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    // 删除已有数据
    await MenuTag.deleteMany({});

    // 插入新的数据
    await MenuTag.insertMany(tags);

    // 查询插入的数据
    const insertedTags = await MenuTag.find();
    console.log('Tags in database:', insertedTags);

    console.log('✅ Tags seeded!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
