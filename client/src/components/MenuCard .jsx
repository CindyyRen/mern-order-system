import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addItemToCart, removeItemFromCart } from '../features/cart/cartSlice';

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  const handleAddToCart = () => {
    dispatch(addItemToCart(item));
    toast.success('已加入购物车！');
  };
  // 随机食品图片生成器
  const getRandomFoodImage = (itemName, itemId) => {
    // 使用商品ID作为种子，确保同一商品总是显示相同图片
    const seed = itemId
      ? itemId.slice(-6)
      : Math.random().toString(36).substr(2, 6);

    // 几个不同的随机食品图片服务
    const services = [
      // Foodish API - 专门的随机食品图片
      `https://foodish-api.com/images/burger/burger${
        (parseInt(seed, 36) % 20) + 1
      }.jpg`,
      // Lorem Picsum 随机图片 (固定种子)
      `https://picsum.photos/seed/${seed}/400/300`,
      // 如果上面都不行，用本地生成的渐变背景
      generateGradientPlaceholder(itemName),
    ];

    return services[0]; // 先尝试第一个服务
  };

  function getImageUrl(rawUrl) {
    // 如果没有图片URL，生成随机食品图片
    if (!rawUrl) {
      return getRandomFoodImage(item.nameCn, item._id);
    }

    if (rawUrl.includes('unsplash.com/photos/')) {
      // 提取 URL 路径中的最后一部分作为 ID
      const path = rawUrl.split('/photos/')[1];
      const parts = path.split('-');
      const id = parts[parts.length - 1].split('?')[0];
      return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`;
    }

    return rawUrl;
  }

  return (
    <Card
      key={item._id}
      className="hover:shadow-lg transition-shadow w-full sm:w-[300px]"
    >
      {/* 图片 */}
      <img
        src={getImageUrl(item.image)}
        alt={item.nameCn}
        className="w-full h-40 object-cover rounded-t-md"
        onError={(e) => {
          // 第一次失败，尝试 Lorem Picsum
          const seed = item._id ? item._id.slice(-6) : 'food';
          const fallbackUrl = `https://picsum.photos/seed/${seed}/400/300`;

          if (e.target.src !== fallbackUrl) {
            e.target.src = fallbackUrl;
          } else {
            // 如果备用服务也失败，使用本地生成的图片
            e.target.src = generateGradientPlaceholder(item.nameCn);
          }
        }}
      />

      <CardHeader>
        <CardTitle className="text-lg">
          {item.nameCn}
          <p className="text-gray-500 text-sm font-normal">{item.nameEn}</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* 包装 & 标签 */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">
            {item.packageSize} {item.packageUnit}
          </Badge>
          {item.tags?.map((tag) => (
            <Badge key={tag} className="bg-orange-100 text-orange-600">
              {tag}
            </Badge>
          ))}
          {item.spiceLevel > 0 && (
            <Badge className="bg-red-100 text-red-600">
              辣度：{item.spiceLevel}
            </Badge>
          )}
        </div>

        {/* 描述 */}
        <p className="text-sm text-gray-600">
          {/* {item.description || '暂无描述'} */}
          {item.description}
        </p>

        {/* 底部价格+按钮 */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-orange-500">
            {item.currency} ${item.price}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAddToCart(item)}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            加入购物车
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
