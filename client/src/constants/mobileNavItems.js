// mobileNavItems.js
import { House, ShoppingBag, Gift, QrCode, Ellipsis } from 'lucide-react';

const mobileNavItems = (setMobileMoreOpen) => [
  {
    name: '首页',
    nameEn: 'Home',
    icon: House, // ✅ 不写 JSX，直接传组件
    href: '/',
  },
  {
    name: '订单',
    nameEn: 'Orders',
    icon: ShoppingBag,
    href: '/orders',
  },
  {
    name: '会员福利',
    nameEn: 'Rewards',
    icon: Gift,
    href: '/rewards',
  },
  {
    name: '扫码',
    nameEn: 'Scan',
    icon: QrCode,
    href: '/code',
  },
  {
    name: '更多',
    nameEn: 'More',
    icon: Ellipsis,
    href: '#',
    action: () => setMobileMoreOpen(true),
  },
];

export default mobileNavItems;
