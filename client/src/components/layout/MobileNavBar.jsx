// components/MobileNavBar.jsx

import React from 'react';
import Link from '../Link';

const MobileNavBar = ({ navItems, isActive, onItemClick, mobileMoreOpen }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 pb-safe">
      <div className="grid grid-cols-5 h-20">
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            {item.action ? (
              <button
                onClick={() => onItemClick(item)}
                className={`flex flex-col items-center justify-center gap-0.5 ${
                  mobileMoreOpen ? 'text-orange-500' : 'text-gray-600'
                } hover:text-orange-500 transition-colors`}
              >
                <item.icon />
                <span className="text-xs font-medium">{item.name}</span>
                <span className="text-xs text-gray-500">{item.nameEn}</span>
              </button>
            ) : (
              <Link
                to={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 ${
                  isActive(item.href) ? 'text-orange-500' : 'text-gray-600'
                } hover:text-orange-500 transition-colors`}
              >
                <item.icon />
                <span className="text-xs font-medium">{item.name}</span>
                <span className="text-xs text-gray-500">{item.nameEn}</span>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavBar;
