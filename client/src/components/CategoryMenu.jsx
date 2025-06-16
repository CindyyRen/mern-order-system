// import React from 'react';
// import { QrCode, ChevronRight } from 'lucide-react';

// const CategoryMenu = ({
//   isMobile = false,
//   categories = [],
//   activeCategory = null,
//   onCategoryClick = () => {},
// }) => (
//   <div className={isMobile ? 'mt-6 divide-y' : 'space-y-1 pr-2'}>
//     {categories.map((category) => (
//       <button
//         key={category.id}
//         onClick={() => onCategoryClick(category.category_id)}
//         className={`${
//           isMobile
//             ? 'flex items-center justify-between py-4 w-full'
//             : `w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
//                 activeCategory === category.category_id
//                   ? 'bg-orange-100 text-orange-600'
//                   : 'hover:bg-gray-100'
//               }`
//         }`}
//       >
//         <div className={`flex items-center ${isMobile ? 'gap-3' : ''}`}>
//           {/* {isMobile && (
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
//               <QrCode />
//             </div>
//           )} */}
//           <div className="flex flex-col">
//             {/* <span className={`font-medium ${isMobile ? '' : 'text-left'}`}> */}
//             <span className={`font-medium text-left`}>
//               {category.category_name}
//               <br />
//               {category.category_name_en}
//             </span>

//             {isMobile && (
//               <span className="text-sm text-gray-500">{category.nameEn}</span>
//             )}
//           </div>
//         </div>
//         <ChevronRight />
//       </button>
//     ))}
//   </div>
// );

// export default CategoryMenu;
import React from 'react';
import { ChevronRight } from 'lucide-react';
import combo2 from '../assets/combo2.png'

// 餐厅分类emoji图标映射
const getCategoryEmoji = (categoryId) => {
  const emojiMap = {
    bestsellers: '👑', // 四大金刚 - 皇冠
    dumplings: '🥟', // 手工點心 - 饺子
    entree: '🥗', // 前菜 - 沙拉
    coldDishes: '🥒', // 凉菜 - 黄瓜
    liveSeafood: '🦞', // 游水海鮮 - 龙虾
    seafood: '🐟', // 海鮮 - 鱼
    pork: '🐷', // 猪肉 - 猪
    poultry: '🐦', // 家禽 - 鸟
    beef: '🥩', // 牛肉類 - 牛肉
    lamb: '🐑', // 羊肉類 - 羊
    vegetables: '🥬', // 時蔬 & 豆腐 - 青菜
    friedRice: '🍚', // 炒飯 - 米饭
    friedNoodle: '🍜', // 面食 - 拉面
    soup: '🍲', // 湯 - 汤
    dessert: '🍰', // 甜品 - 蛋糕
    miscellaneous: '🍱', // 其他 - 便当
    Beverages: '🥤', // 飲品 - 饮料
    housemadeBeverages: '🍹', // 自制飲品 - 鸡尾酒
    coldBeverages: '🧊', // 冷飲 - 冰块
    hotBeverages: '☕', // 热飲 - 咖啡
  };

  return emojiMap[categoryId] || '🍽️'; // 默认餐具emoji
};

const CategoryMenu = ({
  isMobile = false,
  categories = [],
  activeCategory = null,
  onCategoryClick = () => {},
}) => (
  <div className={isMobile ? 'mt-6 space-y-2' : 'space-y-2 pr-2'}>
    {categories.map((category) => {
      const categoryEmoji = getCategoryEmoji(category.category_id);
      const isActive = activeCategory === category.category_id;

      return (
        <div>

          <button
            key={category.id}
            onClick={() => onCategoryClick(category.category_id)}
            className={`${
              isMobile
                ? `flex items-center justify-between py-4 px-4 w-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md rounded-xl mb-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-100 via-red-50 to-yellow-50 border-l-4 border-orange-500 shadow-lg'
                      : 'bg-gradient-to-r from-white via-gray-50 to-white shadow-sm hover:from-orange-50 hover:via-red-25 hover:to-yellow-50 border border-gray-100'
                  }`
                : `w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md mb-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-100 via-red-50 to-yellow-50 text-orange-700 border-l-4 border-orange-500 shadow-lg'
                      : 'bg-gradient-to-r from-white via-gray-50 to-white text-gray-700 shadow-sm hover:from-orange-50 hover:via-red-25 hover:to-yellow-50 hover:text-orange-600 border border-gray-100'
                  }`
            }`}
          >
            <div
              className={`flex items-center ${isMobile ? 'gap-4' : 'gap-3'}`}
            >
              {/* Emoji 图标 */}
              <div
                className={`flex items-center justify-center transition-all duration-300 ${
                  isMobile
                    ? `h-12 w-12 rounded-full text-2xl ${
                        isActive
                          ? 'bg-gradient-to-br from-orange-200 to-red-200 shadow-md transform scale-110'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-orange-100 hover:to-red-100 hover:scale-105'
                      }`
                    : `h-10 w-10 rounded-full text-xl ${
                        isActive
                          ? 'bg-gradient-to-br from-orange-200 to-red-200 shadow-md transform scale-110'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-orange-100 hover:to-red-100 hover:scale-105'
                      }`
                }`}
              >
                <span className="drop-shadow-sm">{categoryEmoji}</span>
              </div>

              <div className="flex flex-col text-left">
                <span
                  className={`font-semibold ${
                    isMobile
                      ? `text-base ${
                          isActive ? 'text-orange-700' : 'text-gray-900'
                        }`
                      : `${isActive ? 'text-orange-700' : ''}`
                  }`}
                >
                  {category.category_name}
                  {!isMobile && (
                    <>
                      <br />
                      <span className="text-xs text-gray-500 font-normal">
                        {category.category_name_en}
                      </span>
                    </>
                  )}
                </span>

                {isMobile && (
                  <span className="text-sm text-gray-500 mt-0.5">
                    {category.category_name_en}
                  </span>
                )}
              </div>
            </div>

            <ChevronRight
              size={isMobile ? 20 : 16}
              className={`transition-all duration-300 ${
                isMobile
                  ? `${
                      isActive
                        ? 'text-orange-600 transform translate-x-1'
                        : 'text-gray-400'
                    }`
                  : `${
                      isActive
                        ? 'text-orange-600 transform translate-x-1'
                        : 'text-gray-400'
                    }`
              }`}
            />
          </button>
        </div>
      );
    })}
  </div>
);

export default CategoryMenu;
