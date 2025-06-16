import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, Users, Minus, Plus, ShoppingCart } from 'lucide-react';
import zongzi from '../assets/zongzi0.png';
import { zongziData } from '@/constants/zongzi';
import { useDispatch } from 'react-redux';

const ZongziDetailPage = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('豆沙粽');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const currentZongzi = zongziData[selectedFlavor];

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      itemId: item.id, // 或者 menuItem.id，根据你的命名
      name: item.name,
      flavor: selectedFlavor,
      quantity: quantity,
      unitPrice: item.price, // 或根据口味价格
    }));

    alert(`已添加 ${quantity} 个 ${selectedFlavor} 到购物车！`);
  };

  return (
    <div className="max-w-4xl mx-auto p-0 bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen">
      {/* 头部 */}
      {/* <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">传统端午粽子</h1>
        <p className="text-gray-600">承载千年文化的美味传承</p>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧 - 图片和基本信息 */}
        <div className="space-y-6">
          <Card className="overflow-hidden shadow-lg">
            <div className="relative">
              <img
                // src={currentZongzi.image}
                src={zongzi}
                alt={currentZongzi.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-red-500 text-white">
                  DREGON BOAT FESTIVAL SPECIAL!
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentZongzi.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{currentZongzi.rating}</span>
                  <span className="text-gray-500">
                    ({currentZongzi.reviews})
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {currentZongzi.cookTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {currentZongzi.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {currentZongzi.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {currentZongzi.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 右侧 - 选择和购买 */}
        <div className="space-y-6">
          {/* 口味选择 */}
          <Card>
            <CardHeader>
              <CardTitle>CHOOSE FLAVORS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.keys(zongziData).map((flavor) => (
                  <div
                    key={flavor}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedFlavor === flavor
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFlavor(flavor)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">
                          {zongziData[flavor].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {zongziData[flavor].ingredients
                            .slice(0, 3)
                            .join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${zongziData[flavor].price}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${zongziData[flavor].originalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 购买选项 */}
          <Card>
            <CardHeader>
              <CardTitle>OPTIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 价格显示 */}
              <div className="flex items-center justify-between">
                <span className="text-lg">PRICE:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${currentZongzi.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${currentZongzi.originalPrice}
                  </span>
                </div>
              </div>

              <Separator />

              {/* 数量选择 */}
              <div className="flex items-center justify-between">
                <span className="text-lg">QUANTITY:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* 总价 */}
              <div className="flex items-center justify-between text-xl font-bold">
                <span>TOTAL:</span>
                <span className="text-green-600">
                  ${(currentZongzi.price * quantity).toFixed(2)}
                </span>
              </div>

              {/* 购买按钮 */}
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADD TO CART
              </Button>
            </CardContent>
          </Card>
          {/* 营养信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">NUTRITION INFO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {currentZongzi.nutrition.calories}
                  </div>
                  <div className="text-sm text-gray-600">CALORIES</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {currentZongzi.nutrition.protein}
                  </div>
                  <div className="text-sm text-gray-600">PROTEIN</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentZongzi.nutrition.carbs}
                  </div>
                  <div className="text-sm text-gray-600">CARBON DIOXIDE</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentZongzi.nutrition.fat}
                  </div>
                  <div className="text-sm text-gray-600">FAT</div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* 配料信息 */}
          <Card>
            <CardHeader>
              <CardTitle>INGREDIENTS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentZongzi.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* 营养信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">NUTRITIONS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {currentZongzi.nutrition.calories}
                  </div>
                  <div className="text-sm text-gray-600">CALORIES</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {currentZongzi.nutrition.protein}
                  </div>
                  <div className="text-sm text-gray-600">PROTEIN</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentZongzi.nutrition.carbs}
                  </div>
                  <div className="text-sm text-gray-600">CARBON DIOXIDE</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentZongzi.nutrition.fat}
                  </div>
                  <div className="text-sm text-gray-600">FAT</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZongziDetailPage;
