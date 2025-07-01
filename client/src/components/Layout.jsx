import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';

import Icon from '@/assets/icon.svg';
import HeaderDesktop from './layout/HeaderDesktop';
import SidebarDesktopCategories from './layout/SidebarDesktopCategories';
import MobileNavBar from './layout/MobileNavBar';
import CategoryMenu from './CategoryMenu';
import Footer from './Footer';
import SeasonalAd from './SeasonalAd';
import MenuBanner from './MenuBanner';
import MobileQuickAccess from './Mobilescroll';
import ComboBanner from './Comobo';
import MenuCard from './MenuCard ';
import { ShoppingCart } from 'lucide-react';

import mobileNavItems from '@/constants/mobileNavItems';
import { mobileMoreMenuItems } from '@/constants/mobileMoreMenuItems';
import { fetchCategories } from '@/features/category/categorySlice';
import { fetchMenuItems } from '@/features/menu/menuSlice';

const Layout = ({ children }) => {
  const cart = useSelector((state) => state.cart.items); // 假设你用 Redux 管理购物车
  const itemCount = cart.length; // 购物车里商品数量
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const navItems = mobileNavItems(setMobileMoreOpen);

  const { items: menuItems = [] } = useSelector((state) => state.menu);
  const { items: categories = [], loading: catLoading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenuItems());
  }, [dispatch]);

  // 路由路径解析
  const currentPath = location.pathname;
  const isHomePage = currentPath === '/';
  const isCategoryDetailPage = currentPath.startsWith('/categories/');
  const isOrderPage = currentPath === '/orders'; // 可根据实际路径调整
  const isLoginPage = currentPath === '/login'; // 可根据实际路径调整

  const currentCategoryId = useMemo(() => {
    if (isCategoryDetailPage) {
      return currentPath.split('/categories/')[1];
    }
    return null;
  }, [currentPath]);

  const currentCategory = useMemo(() => {
    return categories.find((cat) => cat.category_id === currentCategoryId);
  }, [categories, currentCategoryId]);

  // const filteredItems = useMemo(() => {
  //   return menuItems.filter(item => item.category === currentCategoryId);
  // }, [menuItems, currentCategoryId]);

  const categorySlugToIdMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.category_id] = cat._id;
    });
    return map;
  }, [categories]);

  const filteredItems = useMemo(() => {
    const targetCategoryId = categorySlugToIdMap[currentCategoryId];
    return menuItems.filter((item) => item.category === targetCategoryId);
  }, [menuItems, currentCategoryId, categorySlugToIdMap]);

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleMobileNavItemClick = (item) => {
    if (item.action) item.action();
    else navigate(item.href);
  };

  const handleDesktopCategoryClick = (category_id) => {
    navigate(`/categories/${category_id}`);
  };

  const renderDesktopContent = () => {
    if (isCategoryDetailPage) {
      return (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {currentCategory ? currentCategory.name : '分类详情'}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      );
    }

    // 默认首页内容
    return children;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderDesktop />

      <main className="container mx-auto max-w-7xl px-4">
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex">
            {!isOrderPage && !isLoginPage && (
              <SidebarDesktopCategories
                activeCategory={currentCategoryId}
                categories={categories}
                onCategoryClick={handleDesktopCategoryClick}
                onShowAllCategories={() => navigate('/categories')}
              />
            )}
            <div className="flex-1 p-4 md:p-6">{renderDesktopContent()}</div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden pb-20">
          {isHomePage ? (
            <div className="p-4">
              {catLoading ? (
                <p className="text-gray-500">加载中...</p>
              ) : (
                <>
                  {/* <div className="relative flex justify-center items-center space-x-2 border-b border-gray-300 shadow-sm">
                    <img src={Icon} alt="icon" width={50} />
                    <Link
                      to="/cart"
                      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingCart />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-white">
                        {itemCount}
                      </span>
                      <span className="sr-only">购物车</span>
                    </Link>
                    <strong>HAHA</strong>
                  </div> */}
                  <div className="flex items-center border-b border-gray-300 shadow-sm px-4">
                    {/* 左边：图标 + HAHA */}
                    <div className="flex items-center space-x-2">
                      <img src={Icon} alt="icon" width={50} />
                      <strong>HAHA</strong>
                    </div>

                    {/* 右边：购物车 */}
                    <Link
                      to="/cart"
                      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ml-auto"
                    >
                      <ShoppingCart />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-white">
                        {itemCount}
                      </span>
                      <span className="sr-only">购物车</span>
                    </Link>
                  </div>

                  <div className="mt-2">
                    <Link to="/zongzi">
                      <SeasonalAd />
                    </Link>
                  </div>
                  <Link to="/categories">
                    <MenuBanner />
                  </Link>
                  <h2 className="text-2xl font-bold text-gray-800">热卖</h2>
                  <div className="-mx-8">
                    <Link to="/categories/bestsellers">
                      <MobileQuickAccess />
                    </Link>
                  </div>
                  <ComboBanner />
                </>
              )}
            </div>
          ) : (
            <>
              <div className="relative flex justify-center items-center space-x-2 border-b border-gray-300 shadow-sm">
                <img src={Icon} alt="icon" width={50} />
              </div>
              <div className="p-4">{children}</div>
            </>
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
                activeCategory={currentCategoryId}
                onCategoryClick={(id) => {
                  navigate(`/categories/${id}`);
                  setMobileMoreOpen(false);
                }}
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

// import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { X, ChevronRight } from 'lucide-react';
// import Icon from '@/assets/icon.svg';

// import Footer from './Footer';
// // import Link from './Link';
// import HeaderDesktop from './layout/HeaderDesktop';
// import SidebarDesktopCategories from './layout/SidebarDesktopCategories';
// import MobileNavBar from './layout/MobileNavBar';
// import CategoryMenu from './CategoryMenu';

// import mobileNavItems from '@/constants/mobileNavItems';
// import { mobileMoreMenuItems } from '@/constants/mobileMoreMenuItems';
// import { fetchCategories } from '../features/category/categorySlice';
// import SeasonalAd from './SeasonalAd';
// import MenuBanner from './MenuBanner';
// import MobileQuickAccess from './Mobilescroll';
// import { fetchMenuItems } from '@/features/menu/menuSlice';
// import ComboBanner from './Comobo';
// import { Link } from 'react-router-dom';

// const Layout = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
//   const navItems = mobileNavItems(setMobileMoreOpen);
//   const SPECIAL_CATEGORY_ID = '681ffbd348253069aaf72e2b';
//   // 1. 先拿到所有菜单项
//   const {
//     items: menuItems = [], // 默认空数组，防止 undefined
//     loading: menuLoading,
//     error: menuError,
//   } = useSelector((state) => state.menu);
//   const {
//     items: categories,
//     loading: catLoading,
//     error: catError,
//   } = useSelector((state) => state.category);

//   const [activeCategory, setActiveCategory] = useState(null);

//   const currentPath = location.pathname;
//   const isHomePage = currentPath === '/';

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchMenuItems());
//   }, [dispatch]);

//   const filteredMenuItems = useMemo(
//     () => menuItems.filter((item) => item.category === SPECIAL_CATEGORY_ID),
//     [menuItems]
//   );
//   useEffect(() => {
//     if (categories.length > 0 && !activeCategory) {
//       setActiveCategory(categories[0].category_id);
//     }
//   }, [categories, activeCategory]);
//   console.log('categories 在layout页:', categories); //我这里能获取到真实数据

//   const isActive = (path) => {
//     if (path === '/') return currentPath === '/';
//     return currentPath.startsWith(path);
//   };

//   const handleMobileNavItemClick = (item) => {
//     if (item.action) {
//       item.action();
//     } else {
//       navigate(item.href);
//     }
//   };
//   const handleCategoryClick = (category_id) => {
//     setActiveCategory(category_id);
//     navigate(`/category/${category_id}`);
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       <HeaderDesktop />

//       <main className="container mx-auto max-w-7xl px-4">
//         {/* Desktop Layout */}
//         <div className="hidden md:block">
//           {isHomePage ? (
//             <div className="flex">
//               <SidebarDesktopCategories
//                 activeCategory={activeCategory}
//                 categories={categories}
//                 onCategoryClick={handleCategoryClick}
//               />
//               <div className="flex-1 p-4 md:p-6">{children}</div>
//             </div>
//           ) : (
//             <div className="container py-6">{children}</div>
//           )}
//         </div>

//         {/* Mobile Layout */}
//         <div className="md:hidden pb-20">
//           {isHomePage ? (
//             <div className="p-4">
//               {/* <h2 className="hidden font-medium text-lg mb-4">菜品分类</h2> */}
//               {catLoading ? (
//                 <p className="text-gray-500">加载中...</p>
//               ) : (
//                 <>
//                   <div className="relative flex justify-center items-center space-x-2 border-b border-gray-300 shadow-sm">
//                     <img src={Icon} alt="icon" width={50} />
//                     <bold>HAHA</bold>
//                   </div>
//                   <div className="mt-2">
//                     <Link to="/zongzi">
//                       <SeasonalAd />
//                     </Link>
//                   </div>
//                   <Link to="/categories">
//                     <MenuBanner />
//                   </Link>
//                   <h2 className="text-2xl font-bold text-gray-800">热卖</h2>
//                   <div className="-mx-8 ">
//                     {/* <MobileQuickAccess items={filteredMenuItems} /> */}
//                     <Link to="/category/bestsellers">
//                       <MobileQuickAccess />
//                     </Link>
//                   </div>
//                   {/* <MenuBanner /> */}
//                   <ComboBanner />
//                 </>
//               )}
//             </div>
//           ) : (
//             <>
//               <div className="relative flex justify-center items-center space-x-2 border-b border-gray-300 shadow-sm">
//                 <img src={Icon} alt="icon" width={50} />
//                 {/* <bold>LINONG</bold> */}
//               </div>
//               <div className="p-4">{children}</div>
//             </>
//           )}
//         </div>
//       </main>

//       <MobileNavBar
//         navItems={navItems}
//         isActive={isActive}
//         onItemClick={handleMobileNavItemClick}
//         mobileMoreOpen={mobileMoreOpen}
//       />

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
//               <CategoryMenu
//                 isMobile
//                 categories={categories}
//                 activeCategory={activeCategory}
//                 onCategoryClick={handleCategoryClick}
//               />
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
