
import React from 'react';
import CategoryMenu from '../CategoryMenu';

const SidebarDesktopCategories = ({
  activeCategory,
  categories,
  onCategoryClick,
}) => {
  return (
    <aside className="w-60 lg:w-72 shrink-0 border-r h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4">
        <h2 className="font-medium text-lg mb-2">菜品分类</h2>
        <div className="mb-4 border-t border-gray-200"></div>
        <div className="h-[calc(100vh-140px)] overflow-y-auto">
          <CategoryMenu
            isMobile={false}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={onCategoryClick}
          />
        </div>
      </div>
    </aside>
  );
};

export default SidebarDesktopCategories;
