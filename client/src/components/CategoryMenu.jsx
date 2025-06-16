import React from 'react';
import { QrCode, ChevronRight } from 'lucide-react';

const CategoryMenu = ({
  isMobile = false,
  categories = [],
  activeCategory = null,
  onCategoryClick = () => {},
}) => (
  <div className={isMobile ? 'mt-6 divide-y' : 'space-y-1 pr-2'}>
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onCategoryClick(category.category_id)}
        className={`${
          isMobile
            ? 'flex items-center justify-between py-4 w-full'
            : `w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                activeCategory === category.category_id
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`
        }`}
      >
        <div className={`flex items-center ${isMobile ? 'gap-3' : ''}`}>
          {/* {isMobile && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <QrCode />
            </div>
          )} */}
          <div className="flex flex-col">
            {/* <span className={`font-medium ${isMobile ? '' : 'text-left'}`}> */}
            <span className={`font-medium text-left`}>
              {category.category_name}
              <br />
              {category.category_name_en}
            </span>

            {isMobile && (
              <span className="text-sm text-gray-500">{category.nameEn}</span>
            )}
          </div>
        </div>
        <ChevronRight />
      </button>
    ))}
  </div>
);

export default CategoryMenu;
