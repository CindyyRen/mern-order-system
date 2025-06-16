import { User, Clock, MapPin, Ticket, Truck, Info, Phone } from 'lucide-react';

export const mobileMoreMenuItems = [
  {
    name: '个人资料',
    nameEn: 'Profile',
    icon: User,
    href: '/profile',
  },
  {
    name: '最近订单',
    nameEn: 'Recent Orders',
    icon: Clock,
    href: '/recent-orders',
  },
  {
    name: '门店位置',
    nameEn: 'Locations',
    icon: MapPin,
    href: '/locations',
  },
  {
    name: '优惠券',
    nameEn: 'Vouchers',
    icon: Ticket,
    href: '/vouchers',
  },
  {
    name: '外送服务',
    nameEn: 'Delivery',
    icon: Truck,
    href: '/delivery',
  },
  {
    name: '关于我们',
    nameEn: 'About Us',
    icon: Info,
    href: '/about',
  },
  {
    name: '联系与法律',
    nameEn: 'Contact & Legal',
    icon: Phone,
    href: '/contact',
  },
];
