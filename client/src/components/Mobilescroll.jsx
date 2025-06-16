import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import img1 from '@/assets/feature/panf-fried-buns.jpg';
import img2 from '@/assets/feature/steamed-buns.jpeg';
import img4 from '@/assets/feature/red-oil-wonton.jpeg';
import img3 from '@/assets/feature/pan-fried-dumplings.jpeg';
export default function MobileQuickAccess() {
  const items = [
    {
      nameCn: '天同生煎包',
      nameEn: 'Pan Fried Pork Buns',
      price: 15.8,
      image: img1,
    },
    {
      nameCn: '灌湯小籠包',
      nameEn: 'Xiao Long Bao',
      price: 15.8,
      image: img2,
    },
    {
      nameCn: '锅贴',
      nameEn: 'Pan Fried Dumplings',
      price: 16.8,
      image: img3,
    },
    {
      nameCn: '红油抄手',
      nameEn: 'red oil Wonton',
      price: 15.8,
      image: img4,
    },
  ];
  return (
    <div className="block md:hidden px-4">
      <div className="flex overflow-x-auto space-x-4 py-2 no-scrollbar">
        {items.map((item, index) => (
          <Card
            key={index}
            className="w-[33%] flex-shrink-0 overflow-hidden p-0"
          >
            {/* 上半部分图片 */}
            <div
              className="h-24 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* 下半部分内容区域 */}
            <CardContent className="bg-white flex flex-col items-center py-2 text-center">
              <div className="text-primary text-sm font-semibold">
                {item.nameCn}
              </div>
              <div className="text-muted-foreground text-xs">{item.nameEn}</div>
              <div className="text-red-500 text-sm mt-1 font-bold">
                ${item.price}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
