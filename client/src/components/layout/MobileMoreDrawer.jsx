import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import CategoryMenu from '../CategoryMenu';
import Link from '../Link';
import { mobileMoreMenuItems } from '@/constants/mobileMoreMenuItems';

const MobileMoreDrawer = ({ open, onClose }) => {
  if (!open) return null;

  const handleOverlayClick = () => onClose();
  const handleDrawerClick = (e) => e.stopPropagation();

  return (
    <div
      className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl h-[80vh] p-4"
        onClick={handleDrawerClick}
      >
        {/* 顶部滑块 */}
        <div className="flex justify-center mb-4">
          <div className="h-1.5 w-16 rounded-full bg-gray-300" />
        </div>

        {/* 标题栏 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">更多选项 / More Options</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="overflow-y-auto h-[calc(80vh-120px)]">
          <CategoryMenu isMobile />
          <div className="mt-6 space-y-1">
            {mobileMoreMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center justify-between py-4 border-b border-gray-100"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <item.icon />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.nameEn}</span>
                  </div>
                </div>
                <ChevronRight />
              </Link>
            ))}
          </div>
        </div>

        {/* 底部关闭按钮 */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 rounded-full font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            关闭 / Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMoreDrawer;
