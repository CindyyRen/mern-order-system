import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../MenuCategory.js';
dotenv.config();

const rawCategories = [
  {
    category_id: 'bestsellers',
    category_name: '四大金刚',
    category_name_en: 'The Four Best Sellers',
    order: 1,
    image: 'https://unsplash.com/photos/a-bowl-of-dumplings-g7ue2JBhDro',
  },
  {
    category_id: 'dumplings',
    category_name: '手工點心',
    category_name_en: 'Dumplings',
    order: 2,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate-of-dumplings-and-bamboo-steamer-dn5bRFPXcd4',
  },
  {
    category_id: 'entree',
    category_name: '前菜',
    category_name_en: 'Entrée',
    order: 3,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-next-to-a-bowl-of-sauce-BFEC7ft8Pz0',
  },
  {
    category_id: 'coldDishes',
    category_name: '凉菜',
    category_name_en: 'Small Tasting Cold Dishes',
    order: 4,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
  },
  {
    category_id: 'liveSeafood',
    category_name: '游水海鮮',
    category_name_en: 'Live Seafood',
    order: 5,
    image:
      'https://unsplash.com/photos/a-plate-full-of-cooked-crabs-on-a-table-6jOcPlpnr6M',
  },
  {
    category_id: 'seafood',
    category_name: '海鮮',
    category_name_en: 'Seafood Dish',
    order: 6,
    image:
      'https://unsplash.com/photos/a-close-up-of-a-plate-of-food-with-meat-d5CDIZXZyrk',
  },
  {
    category_id: 'pork',
    category_name: '猪肉',
    category_name_en: 'Pork',
    order: 7,
    image:
      'https://unsplash.com/photos/pork-with-green-onions-looks-delicious-in-a-bowl-Rej7zwpSWtM',
  },
  {
    category_id: 'poultry',
    category_name: '家禽',
    category_name_en: 'Poultry',
    order: 8,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-on-top-of-a-table-9Zg7RE3IGkA',
  },
  {
    category_id: 'beef',
    category_name: '牛肉類',
    category_name_en: 'Beef',
    order: 9,
    image:
      'https://unsplash.com/photos/a-green-plate-topped-with-meat-and-greens-zKGAOxq2yg0',
  },
  {
    category_id: 'lamb',
    category_name: '羊肉類',
    category_name_en: 'Lamb',
    order: 10,
    image:
      'https://unsplash.com/photos/a-wooden-table-topped-with-plates-of-food-AitFTpJtT5Y',
  },
  {
    category_id: 'vegetables',
    category_name: '時蔬 & 豆腐',
    category_name_en: 'Daily Picked Vegetables & Tofu-Beancurd',
    order: 11,
    image:
      'https://unsplash.com/photos/sliced-of-vegetables-in-clear-glass-bowl-TqtY4_sQGVE',
  },
  {
    category_id: 'friedRice',
    category_name: '炒飯',
    category_name_en: 'Fried Rice',
    order: 12,
    image: 'https://unsplash.com/photos/bowl-of-fried-rice-oT7_v-I0hHg',
  },
  {
    category_id: 'friedNoodle',
    category_name: '面食',
    category_name_en: 'Fried Noodle',
    order: 13,
    image:
      'https://unsplash.com/photos/a-white-bowl-filled-with-noodles-and-vegetables-TNnhq2nUR8s',
  },
  {
    category_id: 'soup',
    category_name: '湯',
    category_name_en: 'SOUP & CASSEROLE',
    order: 14,
    image: 'https://unsplash.com/photos/soup-in-bowl-fxJTl_gDh28',
  },
  {
    category_id: 'dessert',
    category_name: '甜品',
    category_name_en: 'DESSERT',
    order: 15,
    image:
      'https://unsplash.com/photos/chocolate-cake-beside-strawberries-and-wine-glass-JBIK4QZOFfc',
  },
  {
    category_id: 'miscellaneous',
    category_name: '其他',
    category_name_en: 'MISCELLANEOUS',
    order: 16,
    image:
      'https://unsplash.com/photos/rice-with-sesame-in-black-bowl-zXNC_lBBVGE',
  },
  {
    category_id: 'Beverages',
    category_name: '飲品',
    category_name_en: 'BEVERAGES',
    order: 17,
    image:
      'https://unsplash.com/photos/a-wooden-cutting-board-topped-with-oranges-and-a-cup-of-juice-adJ6x7MKbjc',
  },

  {
    category_id: 'housemadeBeverages',
    category_name: '自制飲品',
    category_name_en: 'HOUSEMADE BEVERAGES',
    parent: 'Beverages',
    order: 1,
    image:
      'https://unsplash.com/photos/assorted-drinking-glasses-on-brown-wooden-surface-HjWzkqW1dgI',
  },
  {
    category_id: 'coldBeverages',
    category_name: '冷飲',
    category_name_en: 'COLD BEVERAGES',
    parent: 'Beverages',
    order: 2,
    image:
      'https://unsplash.com/photos/two-glasses-of-green-smoothie-on-a-table-fz6a7YCdxKs',
  },
  {
    category_id: 'hotBeverages',
    category_name: '热飲',
    category_name_en: 'HOT BEVERAGES',
    parent: 'Beverages',
    order: 3,
    image:
      'https://unsplash.com/photos/flat-lay-photography-of-eight-coffee-latte-in-mugs-on-round-table-pMW4jzELQCw',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await Category.deleteMany({});

    // Step 1: 先插入不带 parent 的数据
    const inserted = await Category.insertMany(
      rawCategories.map((c) => ({ ...c, parent: undefined }))
    );

    // Step 2: 建立 category_id -> _id 的映射
    const idMap = {};
    inserted.forEach((cat) => {
      idMap[cat.category_id] = cat._id;
    });

    // Step 3: 逐条更新带 parent 的分类，把字符串 parent 转成 ObjectId
    const updates = rawCategories
      .filter((c) => c.parent)
      .map(async (c) => {
        await Category.updateOne(
          { category_id: c.category_id },
          { $set: { parent: idMap[c.parent] } }
        );
      });

    await Promise.all(updates);

    const finalCategories = await Category.find();
    console.log('✅ Final categories:', finalCategories);
    process.exit();
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });
