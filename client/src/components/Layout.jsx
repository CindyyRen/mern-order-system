// import React, { useState } from 'react';
// import Footer from './Footer';
// import mobileNavItems from '@/constants/mobileNavItems';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories } from '../features/category/categorySlice';
// import Link from './Link';
// import CategoryMenu from './CategoryMenu';
// import { X } from 'lucide-react';
// import { mobileMoreMenuItems } from '@/constants/mobileMoreMenuItems';
// import { ChevronRight } from 'lucide-react';
// import HeaderDesktop from './layout/HeaderDesktop';
// import SidebarDesktopCategories from './layout/SidebarDesktopCategories';
// import MobileNavBar from './layout/MobileNavBar';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Layout = ({ children }) => {
//   const dispatch = useDispatch();
//   const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
//   const navItems = mobileNavItems(setMobileMoreOpen);
//   const [activeCategory, setActiveCategory] = useState(
//     categories[0].category_id || null
//   );
//   //const [currentPath, setCurrentPath] = useState('/'); // 模拟当前路径
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const isHomePage = currentPath === '/';

//   const navigate = useNavigate();

//   const {
//     items: categories,
//     loading: catLoading,
//     error: catError,
//   } = useSelector((state) => state.category);
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);
//   // 判断当前链接是否激活
//   const isActive = (path) => {
//     if (path === '/') return currentPath === '/';
//     return currentPath.startsWith(path);
//   };

//   // 处理移动端导航项点击
//   const handleMobileNavItemClick = (item) => {
//     if (item.action) {
//       item.action();
//       return;
//     } else {
//       console.log('跳转到：', item.href);
//       navigate(item.href);
//     }
//   };

//   // 处理分类点击
//   const handleCategoryClick = (category_id) => {
//     setActiveCategory(category_id);
//     navigate(`/category/${category_id}`);
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* 电脑端导航栏 */}
//       <HeaderDesktop />
//       {/* 主内容区域 */}
//       <main className="container mx-auto max-w-7xl px-4">
//         {/* 电脑端首页布局 - 直接显示分类菜单 */}
//         <div className="hidden md:block">
//           {isHomePage ? (
//             <div className="flex">
//               {/* 左侧分类菜单 */}
//               <SidebarDesktopCategories
//                 activeCategory={activeCategory}
//                 onCategoryClick={handleCategoryClick}
//               />
//               {/* 右侧内容 */}
//               <div className="flex-1 p-4 md:p-6">{children}</div>
//             </div>
//           ) : (
//             <div className="container py-6">{children}</div>
//           )}
//         </div>

//         {/* 手机端内容 */}
//         <div className="md:hidden pb-20">
//           {isHomePage ? (
//             <div className="p-4">
//               <h2 className="font-medium text-lg mb-4">菜品分类</h2>
//               <CategoryMenu
//                 isMobile={true}
//                 categories={categories}
//                 activeCategory={activeCategory}
//                 onCategoryClick={handleCategoryClick}
//               />
//             </div>
//           ) : (
//             <div className="p-4">{children}</div>
//           )}
//         </div>
//       </main>

//       <MobileNavBar
//         navItems={navItems}
//         isActive={isActive}
//         onItemClick={handleMobileNavItemClick}
//         mobileMoreOpen={mobileMoreOpen}
//       />
//       {/* 手机端更多菜单抽屉 */}
//       {mobileMoreOpen && (
//         <div
//           className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
//           onClick={() => setMobileMoreOpen(false)}
//         >
//           <div
//             className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl h-[80vh] p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-center mb-4">
//               <div className="h-1.5 w-16 rounded-full bg-gray-300" />
//             </div>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">更多选项 / More Options</h2>
//               <button
//                 onClick={() => setMobileMoreOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <X />
//               </button>
//             </div>

//             <div className="overflow-y-auto h-[calc(80vh-120px)]">
//               <CategoryMenu isMobile />
//               <div className="mt-6 space-y-1">
//                 {mobileMoreMenuItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className="flex items-center justify-between py-4 border-b border-gray-100"
//                     onClick={() => setMobileMoreOpen(false)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
//                         <item.icon />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="font-medium">{item.name}</span>
//                         <span className="text-sm text-gray-500">
//                           {item.nameEn}
//                         </span>
//                       </div>
//                     </div>
//                     <ChevronRight />
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6">
//               <button
//                 onClick={() => setMobileMoreOpen(false)}
//                 className="w-full py-3 bg-gray-100 rounded-full font-medium text-gray-700 hover:bg-gray-200 transition-colors"
//               >
//                 关闭 / Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Layout;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';

import Footer from './Footer';
import Link from './Link';
import HeaderDesktop from './layout/HeaderDesktop';
import SidebarDesktopCategories from './layout/SidebarDesktopCategories';
import MobileNavBar from './layout/MobileNavBar';
import CategoryMenu from './CategoryMenu';

import mobileNavItems from '@/constants/mobileNavItems';
import { mobileMoreMenuItems } from '@/constants/mobileMoreMenuItems';
import { fetchCategories } from '../features/category/categorySlice';
import SeasonalAd from './SeasonalAd';
import MenuBanner from './MenuBanner';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const navItems = mobileNavItems(setMobileMoreOpen);

  const {
    items: categories,
    loading: catLoading,
    error: catError,
  } = useSelector((state) => state.category);

  const [activeCategory, setActiveCategory] = useState(null);

  const currentPath = location.pathname;
  const isHomePage = currentPath === '/';

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].category_id);
    }
  }, [categories, activeCategory]);
  console.log('categories:', categories); //我这里能获取到真实数据

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleMobileNavItemClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      navigate(item.href);
    }
  };

  const handleCategoryClick = (category_id) => {
    setActiveCategory(category_id);
    navigate(`/category/${category_id}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderDesktop />

      <main className="container mx-auto max-w-7xl px-4">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {isHomePage ? (
            <div className="flex">
              <SidebarDesktopCategories
                activeCategory={activeCategory}
                categories={categories}
                onCategoryClick={handleCategoryClick}
              />
              <div className="flex-1 p-4 md:p-6">{children}</div>
            </div>
          ) : (
            <div className="container py-6">{children}</div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden pb-20">
          {isHomePage ? (
            <div className="p-4">
              {/* <h2 className="hidden font-medium text-lg mb-4">菜品分类</h2> */}
              {catLoading ? (
                <p className="text-gray-500">加载中...</p>
              ) : (
                <>
                  <SeasonalAd />
                  <MenuBanner />
                  <CategoryMenu
                    isMobile
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryClick={handleCategoryClick}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="p-4">{children}</div>
          )}
        </div>
      </main>

      <MobileNavBar
        navItems={navItems}
        isActive={isActive}
        onItemClick={handleMobileNavItemClick}
        mobileMoreOpen={mobileMoreOpen}
      />

      {mobileMoreOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setMobileMoreOpen(false)}
        >
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl h-[80vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="h-1.5 w-16 rounded-full bg-gray-300" />
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">更多选项 / More Options</h2>
              <button
                onClick={() => setMobileMoreOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(80vh-120px)]">
              <CategoryMenu
                isMobile
                categories={categories}
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
              />
              <div className="mt-6 space-y-1">
                {mobileMoreMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center justify-between py-4 border-b border-gray-100"
                    onClick={() => setMobileMoreOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <item.icon />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          {item.nameEn}
                        </span>
                      </div>
                    </div>
                    <ChevronRight />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setMobileMoreOpen(false)}
                className="w-full py-3 bg-gray-100 rounded-full font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                关闭 / Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Layout;
