// Link.jsx
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Link = ({
  to,
  children,
  className = '',
  onClick,
  isHomePage = false,
}) => {
  const location = useLocation();
  const isCurrentPage = location.pathname === to;

  return (
    <RouterLink to={to} className={className} onClick={onClick}>
      {/* 首页特殊内容，仅在没有 children 时渲染 */}
      {!children && isHomePage && (
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">欢迎来到里弄餐厅</h1>
            <p className="text-gray-600 mb-8">正宗上海风味，传统里弄小吃</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">今日推荐</h3>
                <p className="text-gray-600">小笼包、生煎包、白切鸡</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">特色小吃</h3>
                <p className="text-gray-600">糖醋里脊、红烧肉、白斩鸡</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">经典汤品</h3>
                <p className="text-gray-600">老鸭汤、冬瓜汤、紫菜蛋花汤</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 正常渲染子内容 */}
      {children}
    </RouterLink>
  );
};

export default Link;
