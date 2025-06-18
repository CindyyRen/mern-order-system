import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle } from 'lucide-react';
import {
  removeItemFromCart,
  updateItemQuantity,
} from '../features/cart/cartSlice'; // 假设你有这两个 action
import { toast } from 'react-hot-toast';
const diningOptions = [
  { value: 'takeaway', label: '外带' },
  { value: 'dine_in', label: '堂食' },
  { value: 'delivery', label: '配送' },
];
const CartPage = () => {
  const dispatch = useDispatch();
  const [diningType, setDiningType] = useState('takeaway'); // 默认外带
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success('商品已从购物车移除');
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // 不允许数量小于1
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };

  // 计算总价
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 处理下单按钮点击
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error('购物车为空，无法下单');
      return;
    }
    setLoading(true);

    // 构造发送给后端的数据
    const orderData = {
      items: cartItems.map((item) => ({
        menu_item_id: item._id, // 假设这里id对应菜单商品id
        name: item.nameCn, // 或者你想传中文名还是英文名都可以
        price: item.price,
        quantity: item.quantity,
      })),
      source: 'customer_web', // 这里假设是顾客扫码下单
      placed_by: 'customer', // 顾客下单
      dining_type: diningType, // 使用用户选择的用餐方式
      tax: 0,
      service_fee: 0,
      discount: 0,
      // 你可以加更多字段，比如customer_info等
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || '下单失败');
      }

      const data = await res.json();
      toast.success('订单提交成功！订单号：' + data.order.order_number);
      // 这里可以清空购物车，跳转页面等操作
    } catch (error) {
      toast.error('下单出错: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty, start adding some products!</div>;
  }

  return (
    <div className="cart-page p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Item Name</th>
            <th className="text-right p-2">Price</th>
            <th className="text-center p-2">Quantity</th>
            <th className="text-right p-2">Subtotal</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ _id, nameCn, nameEn, price, quantity }) => (
            <tr key={_id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                {nameCn}-{nameEn}
              </td>
              <td className="p-2 text-right">￥{price.toFixed(2)}</td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(_id, Number(e.target.value))
                  }
                  className="w-16 text-center border rounded"
                />
              </td>
              <td className="p-2 text-right">
                ￥{(price * quantity).toFixed(2)}
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleRemove(_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right font-bold p-2">
              TOTAL PRICE：
            </td>
            <td className="text-right font-bold p-2">
              ￥{totalPrice.toFixed(2)}
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="5" className="text-right p-4">
              {/* 用餐方式选择 */}
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">选择用餐方式</h3>
                <RadioGroup
                  value={diningType}
                  onValueChange={setDiningType}
                  className="flex space-x-6"
                >
                  {diningOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="text-right p-4">
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? '处理中...' : 'CONFIRM ORDER'}
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartPage;
