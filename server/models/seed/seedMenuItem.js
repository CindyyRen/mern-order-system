import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../MenuItem.js';

dotenv.config();

// Menu seed data for Tiantong Restaurant
const menuItems = [
  // BESTSELLERS CATEGORY - "四大金剛" - "The Four Best Sellers"
  {
    itemCode: '001',
    nameCn: '天同生煎包',
    nameEn: 'Pan Fried Pork Buns',
    description: 'Please allow 20 minutes',
    price: 15.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image: 'https://unsplash.com/photos/a-bowl-of-dumplings-g7ue2JBhDro',
    category: '681ffbd348253069aaf72e2b',
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '002',
    nameCn: '灌湯小籠包',
    nameEn: 'Xiao Long Bao - Steamed Soup Dumplings',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image: 'https://unsplash.com/photos/a-bowl-of-dumplings-g7ue2JBhDro',
    category: '681ffbd348253069aaf72e2b',
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '003',
    nameCn: '紅油抄手',
    nameEn: 'Wonton in Red Chilli Sauce',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: ['signature', 'chilli'],
    spiceLevel: 2,
    available: true,
    image: 'https://unsplash.com/photos/a-bowl-of-dumplings-g7ue2JBhDro',
    category: '681ffbd348253069aaf72e2b',
    packageSize: 10,
    packageUnit: 'pcs',
  },
  {
    itemCode: '004',
    nameCn: '招牌上海天同鍋貼',
    nameEn: 'Pan Fried Pork Dumplings',
    description: 'Please allow 20 minutes',
    price: 15.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image: 'https://unsplash.com/photos/a-bowl-of-dumplings-g7ue2JBhDro',
    category: '681ffbd348253069aaf72e2b',
    packageSize: 8,
    packageUnit: 'pcs',
  },

  // DUMPLINGS CATEGORY - "手工點心" - "Dumplings"
  {
    itemCode: '005',
    nameCn: '韭菜豬肉水餃',
    nameEn: 'Steamed Pork and Chives Dumplings',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 12,
    packageUnit: 'pcs',
  },
  {
    itemCode: '006',
    nameCn: '花素蒸餃',
    nameEn: 'Steamed Vegetarian Dumplings',
    description: '',
    price: 14.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '007',
    nameCn: '花素煎餃',
    nameEn: 'Pan Fried Vegetarian Dumplings',
    description: 'Please allow 20 minutes',
    price: 15.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '008',
    nameCn: '韭菜鮮蝦蒸餃',
    nameEn: 'Steamed Prawn and Chives Dumplings',
    description: '',
    price: 16.8,
    currency: 'AUD',
    tags: ['shellfish'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '009',
    nameCn: '薺菜豬肉大餛飩',
    nameEn: 'Pork and Vegetables Wonton Soup',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 10,
    packageUnit: 'pcs',
  },
  {
    itemCode: '010',
    nameCn: '蝦肉小餛飩',
    nameEn: 'Prawn and Pork Mini Wonton Soup',
    description: '',
    price: 13.8,
    currency: 'AUD',
    tags: ['shellfish'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 12,
    packageUnit: 'pcs',
  },
  {
    itemCode: '011',
    nameCn: '上海糯米燒賣',
    nameEn: 'Shanghai Style Steamed Sticky Rice Dumplings',
    description: '',
    price: 13.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 6,
    packageUnit: 'pcs',
  },
  {
    itemCode: '021',
    nameCn: '蘿蔔絲酥餅',
    nameEn: 'Shanghai Style Radish Croissants With Shrimp And Ham',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: ['shellfish'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 4,
    packageUnit: 'pcs',
  },
  {
    itemCode: '022',
    nameCn: '棗泥千層糕',
    nameEn: 'Layered Cake with Jujube Paste',
    description: '',
    price: 11.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 4,
    packageUnit: 'pcs',
  },
  {
    itemCode: '023',
    nameCn: '素齋春卷',
    nameEn: 'Vegetarian Spring Rolls',
    description: '',
    price: 9.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 4,
    packageUnit: 'pcs',
  },
  {
    itemCode: '024',
    nameCn: '蔥油餅',
    nameEn: 'Shallots Pancake',
    description: '',
    price: 11.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 1,
    packageUnit: 'piece',
  },
  {
    itemCode: '025',
    nameCn: '金色小刀切',
    nameEn: 'Crispy Pillow Buns',
    description: 'Steamed option available',
    price: 9.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 6,
    packageUnit: 'pcs',
  },
  {
    itemCode: '026',
    nameCn: '韭菜鲜虾春卷',
    nameEn: 'Prawn and Chives Spring Roll',
    description: '',
    price: 10.8,
    currency: 'AUD',
    tags: ['shellfish'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 3,
    packageUnit: 'pcs',
  },
  {
    itemCode: '027',
    nameCn: '黑松露小籠包',
    nameEn: 'Black Truffle Xiao Long Bao',
    description: '',
    price: 16.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '028',
    nameCn: '韭菜帶子蝦蒸餃',
    nameEn: 'Steamed Dumplings Filled With Chives, Scallop & Prawns',
    description: '',
    price: 16.8,
    currency: 'AUD',
    tags: ['shellfish'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cropped-shot-of-kitchen-table-with-a-plate',
    category: '681ffbd348253069aaf72e2c',
    packageSize: 6,
    packageUnit: 'pcs',
  },

  // ENTRÉE CATEGORY - "前菜" - "Entrée"
  {
    itemCode: '017',
    nameCn: '小桶香炸雞',
    nameEn: 'A Bucket Of Crispy Chicken Nuggets Served with Dipping Sauce',
    description: 'Chilli or sweet sauce options available',
    price: 17.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-next-to-a-bowl-of-sauce-BFEC7ft8Pz0',
    category: '681ffbd348253069aaf72e2d',
    packageSize: 1,
    packageUnit: 'bucket',
  },
  {
    itemCode: '018',
    nameCn: '小桶香炸蘑菇',
    nameEn: 'A Bucket Of Crispy Mushrooms Served with Dipping Sauce',
    description: 'Chilli or sweet sauce options available',
    price: 17.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-next-to-a-bowl-of-sauce-BFEC7ft8Pz0',
    category: '681ffbd348253069aaf72e2d',
    packageSize: 1,
    packageUnit: 'bucket',
  },
  {
    itemCode: '019',
    nameCn: '大桶香炸雞+炸蘑菇',
    nameEn:
      'Mixed Bucket Of Crispy Chicken Nuggets and Mushrooms Served with Dipping Sauce',
    description: 'Chilli or sweet sauce options available',
    price: 20.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-next-to-a-bowl-of-sauce-BFEC7ft8Pz0',
    category: '681ffbd348253069aaf72e2d',
    packageSize: 1,
    packageUnit: 'bucket',
  },

  // COLD DISHES CATEGORY - "涼菜" - "Small Tasting Cold Dishes"
  {
    itemCode: '101',
    nameCn: '油燜春筍',
    nameEn: 'Braised Bamboo Shoots',
    description: '',
    price: 12.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '102',
    nameCn: '四喜烤麩',
    nameEn:
      'Typical Shanghainese Appetizer Including Dried Lily Bulbs, Black Fungus And Peanuts',
    description: '',
    price: 12.8,
    currency: 'AUD',
    tags: ['vegetarian', 'nut'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '105',
    nameCn: '上海熏魚',
    nameEn: 'Smoked Fish Fillet With Soya Sauce',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '107',
    nameCn: '鹽水鴨',
    nameEn: 'Nanjing Style Salted Duck',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '108',
    nameCn: '口水嫩雞',
    nameEn:
      'Boneless Poached Chicken Covered In A Mix Of Chilli And Sesame Oil With Crushed Peanuts',
    description: '',
    price: 15.8,
    currency: 'AUD',
    tags: ['chilli', 'nut', 'sesame'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '110',
    nameCn: '糖醋小排',
    nameEn: 'Sweet & Sour Pork Ribs',
    description: '',
    price: 14.8,
    currency: 'AUD',
    tags: [],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '113',
    nameCn: '蒜拍黃瓜',
    nameEn: 'Cucumber Marinated With A Minced Garlic Vinaigrette',
    description: '',
    price: 12.8,
    currency: 'AUD',
    tags: ['vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '115',
    nameCn: '海蜇大拌菜',
    nameEn: 'Jellyfish Mixed Salad',
    description: '',
    price: 12.8,
    currency: 'AUD',
    tags: ['shellfish'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '116',
    nameCn: '燒椒皮蛋豆腐',
    nameEn: 'Tofu With Century Egg And Chilli Pepper Salad',
    description: '',
    price: 12.8,
    currency: 'AUD',
    tags: ['vegetarian', 'chilli', 'egg'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-noodles-and-vegetables-on-a-table-o7Qqr5wrZec',
    category: '681ffbd348253069aaf72e2e',
    packageSize: 1,
    packageUnit: 'serving',
  },

  // CHEF'S RECOMMENDATIONS
  {
    itemCode: 'G02',
    nameCn: '上海走油肉',
    nameEn: 'Triple Cooked Pork Belly',
    description: 'Steamed, Deep Fried And Braised',
    price: 30.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/pork-with-green-onions-looks-delicious-in',
    category: '681ffbd348253069aaf72e31', // Assigned to pork category
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: 'G04',
    nameCn: '天同烤鴨兩食',
    nameEn: 'Two Course Roasted Duck',
    description:
      '1St Course: Whole Roasted Duck, 2Nd Course: San Choy Bow／Stir Fried Noodles Add $10',
    price: 78.0,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-on-to',
    category: '681ffbd348253069aaf72e32', // Assigned to poultry category
    packageSize: 1,
    packageUnit: 'whole duck',
  },
  {
    itemCode: 'G05',
    nameCn: '天同烤鴨/半隻',
    nameEn: 'Signature Roasted Duck/Half',
    description: '',
    price: 39.0,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-on-to',
    category: '681ffbd348253069aaf72e32', // Assigned to poultry category
    packageSize: 0.5,
    packageUnit: 'duck',
  },
  {
    itemCode: 'G10-1',
    nameCn: '海南雞/整隻',
    nameEn: 'Boneless Whole Hainanese Chicken',
    description: '',
    price: 34.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-on-to',
    category: '681ffbd348253069aaf72e32', // Assigned to poultry category
    packageSize: 1,
    packageUnit: 'whole chicken',
  },
  {
    itemCode: 'G10-2',
    nameCn: '海南雞/半隻',
    nameEn: 'Boneless Hainanese Chicken',
    description: 'Half portion',
    price: 21.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-white-plate-topped-with-fried-food-on-to',
    category: '681ffbd348253069aaf72e32', // Assigned to poultry category
    packageSize: 0.5,
    packageUnit: 'chicken',
  },
  {
    itemCode: '317',
    nameCn: '松鼠活魚',
    nameEn:
      'A Very Famous Shanghainese Dish - Live Barramundi Skillfully Carved with Pine-Cone Cut and Finished in a Tangy Sweet & Sour Sauce',
    description: '',
    price: 43.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-plate-full-of-cooked-crabs-on-a-table-6j',
    category: '681ffbd348253069aaf72e2f', // Assigned to live seafood category
    packageSize: 1,
    packageUnit: 'fish',
  },

  // MUST TRY DISHES
  {
    itemCode: '308',
    nameCn: '黑胡椒年糕蟹',
    nameEn: 'Black Pepper Crab with Rice Cake',
    description: 'Rice cakes add $8, market price for crab',
    price: 0, // Market price
    currency: 'AUD',
    tags: ['signature', 'shellfish'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/a-plate-full-of-cooked-crabs-on-a-table-6j',
    category: '681ffbd348253069aaf72e2f', // Assigned to live seafood category
    packageSize: 1,
    packageUnit: 'crab',
  },
  {
    itemCode: '402',
    nameCn: 'XO粉絲蝦球',
    nameEn: 'King Prawns Flash Fried in XO Sauce Served with Vermicelli',
    description: '',
    price: 30.8,
    currency: 'AUD',
    tags: ['signature', 'shellfish', 'chilli'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/a-close-up-of-a-plate-of-food-with-meat-d5',
    category: '681ffbd348253069aaf72e30', // Assigned to seafood category
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '420',
    nameCn: '響油鱔糊',
    nameEn: 'Flash Fried Shredded Eel with Bamboo Shoots, Ginger and Shallots',
    description: '',
    price: 30.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/a-close-up-of-a-plate-of-food-with-meat-d5',
    category: '681ffbd348253069aaf72e30', // Assigned to seafood category
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '508',
    nameCn: '農家小炒肉',
    nameEn: "Farmer's Style Stir Fried Spicy Pork With Bamboo Shoots",
    description: '',
    price: 25.8,
    currency: 'AUD',
    tags: ['signature', 'chilli'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/pork-with-green-onions-looks-delicious-in',
    category: '681ffbd348253069aaf72e31', // Assigned to pork category
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '512',
    nameCn: '極品黑椒牛仔粒',
    nameEn: 'Flash Fried Diced Wagyu Steak with Black Pepper',
    description: '',
    price: 38.8,
    currency: 'AUD',
    tags: ['signature'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/a-green-plate-topped-with-meat-and-greens',
    category: '681ffbd348253069aaf72e33', // Assigned to beef category
    packageSize: 1,
    packageUnit: 'serving',
  },
  {
    itemCode: '512',
    nameCn: '極品黑椒牛仔粒',
    nameEn: 'Flash Fried Diced Wagyu Steak with Black Pepper',
    description:
      'Premium wagyu beef steak diced and flash fried with aromatic black pepper',
    price: 38.8,
    currency: 'AUD',
    tags: ['beef', 'signature'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/a-plate-of-steak-and-vegetables-on-a-table-dnQdDPwTAh0',
    category: '681ffbd348253069aaf72e33', // beef category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '513',
    nameCn: '水煮牛肉',
    nameEn: 'Beef Braised In Sichuan Chilli Oil',
    description: "It looks spicy yet it's aromatic with medium heat onion",
    price: 27.8,
    currency: 'AUD',
    tags: ['beef', 'sichuan'],
    spiceLevel: 3,
    available: true,
    image:
      'https://unsplash.com/photos/a-bowl-of-spicy-beef-stew-with-vegetables-CbNAuxSZTFo',
    category: '681ffbd348253069aaf72e33', // beef category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '514',
    nameCn: '幹鍋牛肉',
    nameEn: 'Wok Fried Spicy Beef With King Mushroom',
    description: 'Tender beef stir-fried with premium king oyster mushrooms',
    price: 27.8,
    currency: 'AUD',
    tags: ['beef', 'spicy'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/a-plate-of-food-with-meat-and-vegetables-pY_AZJfdbHQ',
    category: '681ffbd348253069aaf72e33', // beef category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '515',
    nameCn: '芥末牛仔粒',
    nameEn: 'Flash Fried Diced Wagyu Steak Marinated in Wasabi',
    description:
      'Premium wagyu beef steak diced and flash fried with Japanese wasabi',
    price: 38.8,
    currency: 'AUD',
    tags: ['beef', 'fusion'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/a-plate-of-steak-with-sauce-on-top-of-it-Hj53USePB1E',
    category: '681ffbd348253069aaf72e33', // beef category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '517',
    nameCn: '紙包生煎小牛肉',
    nameEn: 'Paper Wrapped Tender Beef and Onions',
    description:
      'Delicate beef and sweet onions cooked in paper wrapping to seal in flavors',
    price: 26.8,
    currency: 'AUD',
    tags: ['beef'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/beef-wrapped-in-paper-with-herbs-and-spices-lhM27XqU5kY',
    category: '681ffbd348253069aaf72e33', // beef category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '518',
    nameCn: '雙椒牛肉',
    nameEn: 'Sichuan Style Spicy Beef',
    description: 'Recommend to eat with homemade pancake (add pancake $6)',
    price: 26.8,
    currency: 'AUD',
    tags: ['beef', 'sichuan', 'spicy'],
    spiceLevel: 3,
    available: true,
    image:
      'https://unsplash.com/photos/spicy-beef-stir-fry-with-peppers-in-a-dark-bowl-DgQlNSrCfdE',
    category: '681ffbd348253069aaf72e33', // beef category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '527',
    nameCn: '风味羊排',
    nameEn: 'Lamb Ribs Smoked in Aromatic Flavour',
    description: 'Tender lamb ribs smoked with traditional Chinese spices',
    price: 30.8,
    currency: 'AUD',
    tags: ['lamb'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/grilled-lamb-ribs-with-herbs-and-spices-G4Lh3OU1L1Y',
    category: '681ffbd348253069aaf72e34', // lamb category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '528',
    nameCn: '孜然羊肉',
    nameEn: 'Flash Fried Lamb Slices with Cumin',
    description: 'Lamb slices stir-fried with aromatic cumin spices',
    price: 30.8,
    currency: 'AUD',
    tags: ['lamb', 'spicy'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/cumin-lamb-stir-fry-in-a-black-bowl-ub6Oyn0RViU',
    category: '681ffbd348253069aaf72e34', // lamb category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '529',
    nameCn: '蔥爆羊肉',
    nameEn: 'Flash Fried Lamb with Spring Onion',
    description: 'Tender lamb slices stir-fried with abundant spring onions',
    price: 30.8,
    currency: 'AUD',
    tags: ['lamb'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/lamb-stir-fry-with-green-onions-in-a-wok-yUeH6-9L9JU',
    category: '681ffbd348253069aaf72e34', // lamb category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '530',
    nameCn: '蒙古羊肉',
    nameEn: 'Mongolian Lamb',
    description: 'Classical Mongolian-style lamb with rich savory sauce',
    price: 30.8,
    currency: 'AUD',
    tags: ['lamb'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/mongolian-lamb-stir-fry-in-dark-sauce-E7D9Hw0JNvs',
    category: '681ffbd348253069aaf72e34', // lamb category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '601',
    nameCn: '宮保雞丁',
    nameEn: 'Kung Pao Diced Chicken with Peanuts in a Sweet Chilli Sauce',
    description:
      'Classical Sichuan dish with diced chicken, peanuts and dried chili',
    price: 24.8,
    currency: 'AUD',
    tags: ['poultry', 'sichuan', 'spicy', 'nuts'],
    spiceLevel: 3,
    available: true,
    image:
      'https://unsplash.com/photos/kung-pao-chicken-in-a-dark-bowl-with-peanuts-qK6UAoGpgGU',
    category: '681ffbd348253069aaf72e32', // poultry category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '602',
    nameCn: '秘製山東雞',
    nameEn: 'Shangtung Crispy Chicken',
    description: 'Crispy chicken prepared with secret Shandong recipe',
    price: 24.8,
    currency: 'AUD',
    tags: ['poultry', 'signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/crispy-fried-chicken-on-a-white-plate-yXmjBxvkoG4',
    category: '681ffbd348253069aaf72e32', // poultry category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '603',
    nameCn: '香炸八塊',
    nameEn: 'Salt & Pepper Crispy Nuggets',
    description: 'Crispy chicken nuggets seasoned with salt and pepper',
    price: 24.8,
    currency: 'AUD',
    tags: ['poultry'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/crispy-chicken-nuggets-on-a-white-plate-k8wL9L38jn0',
    category: '681ffbd348253069aaf72e32', // poultry category
    packageSize: 8,
    packageUnit: 'pcs',
  },
  {
    itemCode: '604',
    nameCn: '辣子雞丁',
    nameEn: 'Deep Fried Diced Chicken With Dry Chilli',
    description: 'Crispy diced chicken stir-fried with abundant dried chilies',
    price: 24.8,
    currency: 'AUD',
    tags: ['poultry', 'spicy'],
    spiceLevel: 4,
    available: true,
    image:
      'https://unsplash.com/photos/spicy-chicken-with-red-chilies-in-a-dark-bowl-t4DzgXUPF0A',
    category: '681ffbd348253069aaf72e32', // poultry category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '701',
    nameCn: '杏鮑菇銀絲豆苗',
    nameEn: 'Flash Fried Snow Pea Sprouts with King Oyster Mushrooms',
    description:
      'Fresh snow pea sprouts stir-fried with premium king oyster mushrooms',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetarian', 'vegetables'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/stir-fried-vegetables-with-mushrooms-in-a-dark-plate-k_9qY0Xag60',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '702',
    nameCn: 'XO醬生炒豆苗',
    nameEn: 'Flash Fried Snow Pea Sprouts in XO Sauce',
    description: 'Fresh snow pea sprouts stir-fried with premium XO sauce',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetables', 'seafood'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/stir-fried-greens-with-xo-sauce-in-a-plate-cBt47TXJiwU',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '703',
    nameCn: '乾煸四季豆',
    nameEn: 'Double Fried Green Beans with Pork Mince and Dried Shrimps',
    description:
      'Crispy green beans stir-fried with savory minced pork and dried shrimp',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetables', 'pork'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/stir-fried-green-beans-in-a-dark-plate-fPwjOwKQc8A',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '705',
    nameCn: '乾鍋小炒真菌',
    nameEn: 'Wok Fried Assorted Mushrooms',
    description: 'Variety of premium mushrooms stir-fried in a hot wok',
    price: 23.8,
    currency: 'AUD',
    tags: ['vegetarian', 'vegetables'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/stir-fried-mushrooms-in-a-bowl-F_aLqV3PSM8',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '706',
    nameCn: '魚香茄子煲',
    nameEn: 'Eggplant and Pork Mince Braised with Sweet Chilli and Vinegar',
    description:
      'Soft eggplant braised with minced pork in Sichuan "fish-fragrant" sauce',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetables', 'pork', 'sichuan'],
    spiceLevel: 2,
    available: true,
    image:
      'https://unsplash.com/photos/eggplant-dish-with-sauce-in-a-clay-pot-LO7rNP0LRto',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'pot',
  },
  {
    itemCode: '710',
    nameCn: '香鍋小土豆',
    nameEn: 'Wok Fried Baby Potato slices with pork',
    description: 'Crispy baby potato slices stir-fried with savory pork',
    price: 20.8,
    currency: 'AUD',
    tags: ['vegetables', 'pork'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/fried-potatoes-with-meat-in-a-dark-bowl-nq5vdSYPYdQ',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '711',
    nameCn: '鮮蝦蟲草花上湯菠菜',
    nameEn:
      'Prawns, Cordyceps Flower and English Spinach Poached in Master Broth',
    description:
      'Fresh prawns and English spinach poached with cordyceps flower in premium broth',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetables', 'seafood', 'healthy'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/prawns-and-vegetables-in-clear-broth-Uyz0CxRkappreciated',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '715',
    nameCn: '蒜香醬燒茄子',
    nameEn: 'Twice Fried Eggplant with Garlic and Coriander',
    description:
      'Crispy eggplant twice-fried with aromatic garlic and fresh coriander',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetarian', 'vegetables'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/fried-eggplant-with-garlic-sauce-in-a-dark-plate-KBCuU9XfOoY',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '717',
    nameCn: '香菇菜心',
    nameEn: 'Braised Chinese Shitake Mushrooms With Shanghai Pak Choy',
    description:
      'Tender Shanghai bok choy braised with premium shiitake mushrooms',
    price: 19.8,
    currency: 'AUD',
    tags: ['vegetarian', 'vegetables'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/braised-vegetables-with-mushrooms-in-a-white-plate-cZcknM-zFyM',
    category: '681ffbd348253069aaf72e35', // vegetables category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '718',
    nameCn: '乾鍋花菜炒五花肉',
    nameEn: 'Wok Fried Cauliflower And Pork Belly Slices',
    description: 'Cauliflower stir-fried with savory pork belly slices',
    price: 21.8,
    currency: 'AUD',
    tags: ['vegetables', 'pork'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/stir-fried-cauliflower-with-pork-in-a-dark-plate-qY9zDSI9qHo',
    category: '681ffbd348253069aaf72e31', // pork category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '801',
    nameCn: '鹹蛋黃豆腐',
    nameEn: 'Crispy Tofu Coated with Salted Egg Yolk Sauce',
    description: 'Crispy tofu cubes coated with rich salted egg yolk sauce',
    price: 22.8,
    currency: 'AUD',
    tags: ['vegetarian', 'tofu'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/tofu-with-yellow-sauce-in-a-white-plate-kUJ9Rc_t3-8',
    category: '681ffbd348253069aaf72e35', // vegetables & tofu category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '804',
    nameCn: '椒鹽豆腐',
    nameEn: 'Salt and Pepper Tofu',
    description: 'Crispy tofu cubes seasoned with salt and pepper',
    price: 20.8,
    currency: 'AUD',
    tags: ['vegetarian', 'tofu'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/crispy-tofu-cubes-on-a-white-plate-wK8vhF_uLgw',
    category: '681ffbd348253069aaf72e35', // vegetables & tofu category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '805',
    nameCn: '麻婆豆腐',
    nameEn:
      'Ma Po Tofu - Silken Tofu Braised With Minced Pork And A Chilli Bean Sauce',
    description:
      'Classic Sichuan dish with silken tofu and minced pork in spicy bean sauce',
    price: 20.8,
    currency: 'AUD',
    tags: ['tofu', 'pork', 'sichuan', 'spicy'],
    spiceLevel: 3,
    available: true,
    image:
      'https://unsplash.com/photos/mapo-tofu-in-a-clay-pot-with-rice-KVPwqqscrTQ',
    category: '681ffbd348253069aaf72e35', // vegetables & tofu category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '902',
    nameCn: '揚州炒飯',
    nameEn: 'Yangzhou Style Fried Rice with Ham, School Prawns, Egg and Peas',
    description:
      'Classic fried rice with diced ham, small prawns, scrambled eggs and green peas',
    price: 16.8,
    currency: 'AUD',
    tags: ['rice', 'pork', 'seafood'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/yangzhou-fried-rice-in-a-white-bowl-bfGDVQzJ3Ck',
    category: '681ffbd348253069aaf72e36', // fried rice category
    packageSize: 1,
    packageUnit: 'bowl',
  },
  {
    itemCode: '903',
    nameCn: '上海鹹肉菜飯',
    nameEn:
      'Shanghainese Style Fried Rice with Pork Lard, Diced Salted Pork and Vegetables',
    description:
      'Traditional Shanghai fried rice with pork lard, diced salted pork and vegetables',
    price: 16.8,
    currency: 'AUD',
    tags: ['rice', 'pork', 'shanghai'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/shanghai-fried-rice-with-pork-in-a-dark-bowl-nML4hJe6rL8',
    category: '681ffbd348253069aaf72e36', // fried rice category
    packageSize: 1,
    packageUnit: 'bowl',
  },
  {
    itemCode: '907',
    nameCn: 'XO雞粒炒飯',
    nameEn: 'Diced Chicken Fried Rice in Xo Sauce',
    description:
      'Flavorful fried rice with diced chicken in premium XO sauce (contains pork)',
    price: 17.8,
    currency: 'AUD',
    tags: ['rice', 'poultry', 'pork'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/fried-rice-with-chicken-in-a-black-bowl-BzA0yQnrbp4',
    category: '681ffbd348253069aaf72e36', // fried rice category
    packageSize: 1,
    packageUnit: 'bowl',
  },
  {
    itemCode: '908',
    nameCn: '素炒飯',
    nameEn: 'Vegetarian Fried Rice',
    description: 'Fried rice with assorted vegetables',
    price: 16.8,
    currency: 'AUD',
    tags: ['rice', 'vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/vegetarian-fried-rice-in-a-white-bowl-yGLOiJYBRNg',
    category: '681ffbd348253069aaf72e36', // fried rice category
    packageSize: 1,
    packageUnit: 'bowl',
  },
  {
    itemCode: '909',
    nameCn: '香辣特別炒飯',
    nameEn: 'Special Fried Rice With Diced Chicken, Prawns, Ham',
    description:
      'Deluxe fried rice with premium ingredients including chicken, prawns and ham',
    price: 16.8,
    currency: 'AUD',
    tags: ['rice', 'poultry', 'seafood', 'pork'],
    spiceLevel: 1,
    available: true,
    image:
      'https://unsplash.com/photos/special-fried-rice-with-mixed-ingredients-in-a-black-bowl-RT5YXsGcGM8',
    category: '681ffbd348253069aaf72e36', // fried rice category
    packageSize: 1,
    packageUnit: 'bowl',
  },
  {
    itemCode: '913',
    nameCn: '上海粗炒',
    nameEn:
      'Our Famous Shanghainese Fried Noodles With Shredded Pork And Vegetables',
    description:
      'Traditional Shanghai thick noodles stir-fried with shredded pork and vegetables',
    price: 17.8,
    currency: 'AUD',
    tags: ['noodles', 'pork', 'shanghai', 'signature'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/shanghai-fried-noodles-with-pork-in-a-white-plate-yJVuqrXfUxU',
    category: '681ffbd348253069aaf72e37', // fried noodle category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '914',
    nameCn: '什錦炒麵',
    nameEn: 'Combination Fried Noodles With Prawns, Beef And Vegetables',
    description:
      'Stir-fried noodles with a premium combination of prawns, beef and vegetables',
    price: 19.8,
    currency: 'AUD',
    tags: ['noodles', 'seafood', 'beef'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/combination-fried-noodles-in-a-white-plate-4WCphoZC_RQ',
    category: '681ffbd348253069aaf72e37', // fried noodle category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '915',
    nameCn: '鮮蝦蔥油拌麵',
    nameEn:
      'Dry Noodles With Prawns Drizzled With A Mixture Of Soya And Shallot Oil',
    description:
      'Cold noodles with fresh prawns seasoned with a fragrant mixture of soy sauce and shallot oil',
    price: 17.8,
    currency: 'AUD',
    tags: ['noodles', 'seafood'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/cold-noodles-with-prawns-in-a-white-bowl-j8UqLGAMYXk',
    category: '681ffbd348253069aaf72e37', // fried noodle category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '916',
    nameCn: '羅漢素炒麵',
    nameEn: 'Vegetarian Fried Noodles',
    description:
      'Buddhist style vegetarian fried noodles with assorted vegetables',
    price: 17.8,
    currency: 'AUD',
    tags: ['noodles', 'vegetarian'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/vegetarian-fried-noodles-in-a-white-plate-HYMnCvR8jPs',
    category: '681ffbd348253069aaf72e37', // fried noodle category
    packageSize: 1,
    packageUnit: 'plate',
  },
  {
    itemCode: '917',
    nameCn: '乾炒牛河',
    nameEn:
      'Dry Fried Beef In Rice Noodles With Bean Sprouts And Dark Soya Sauce',
    description:
      'Wide rice noodles stir-fried with tender beef, bean sprouts and dark soy sauce',
    price: 18.8,
    currency: 'AUD',
    tags: ['noodles', 'beef'],
    spiceLevel: 0,
    available: true,
    image:
      'https://unsplash.com/photos/beef-chow-fun-noodles-in-a-white-plate-r9bSZS-_UxM',
    category: '681ffbd348253069aaf72e37', // fried noodle category
    packageSize: 1,
    packageUnit: 'plate',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    // 删除已有 MenuItem 数据
    await MenuItem.deleteMany({});

    // 插入新的 MenuItem 数据
    await MenuItem.insertMany(menuItems);

    // 查询插入的数据（可选）
    const insertedItems = await MenuItem.find();
    console.log('MenuItems in database:', insertedItems);

    console.log('✅ MenuItems seeded!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
