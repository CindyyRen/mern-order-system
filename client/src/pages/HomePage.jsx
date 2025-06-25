import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../features/menu/menuSlice';
import MenuCard from '@/components/MenuCard ';
import SeasonalAd from '@/components/SeasonalAd';
import { cn } from '@/lib/utils'; // shadcn 的 className 工具

const HomePage = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);

  const {
    items: menuItems,
    loading: menuLoading,
    error: menuError,
  } = useSelector((state) => state.menu);

  const { loading: catLoading, error: catError } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);
  // 提取所有的 nameCn 字段
  menuItems.forEach((item) => {
    console.log(`${item.nameCn} - $${item.price}`);
  });
  const filteredMenuItems = activeCategory
    ? menuItems.filter((item) => item.category === activeCategory)
    : menuItems;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* 菜单卡片 */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenuItems.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>

      {/* 加载 & 错误状态 */}
      {(catLoading || menuLoading) && (
        <p className="text-center mt-4">加载中...</p>
      )}
      {(catError || menuError) && (
        <p className="text-center mt-4 text-red-500">
          出错了：{catError || menuError}
        </p>
      )}
    </div>
  );
};

export default HomePage;
