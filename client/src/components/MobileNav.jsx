// src/components/MobileNav.jsx
//import mobileNavItems from '../constants/mobileNavItems'; // 路径按你实际情况调整
import mobileNavItems from "@/constants/mobileNavItems";
const MobileNav = ({ setMobileMoreOpen }) => {
  const items = mobileNavItems(setMobileMoreOpen);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={item.action || undefined}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-black"
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
