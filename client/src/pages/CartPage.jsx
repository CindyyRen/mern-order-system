import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '@/features/order/orderSlice';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
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

  const handleRemove = (_id) => {
    console.log('handleRemove called with id:', _id); // 调试用
    console.log('Current cart items:', cartItems); // 调试用
    dispatch(removeItemFromCart(_id));
    toast.success('商品已从购物车移除');
  };

  const handleQuantityChange = (_id, newQuantity) => {
    if (newQuantity < 1) return; // 不允许数量小于1
    dispatch(updateItemQuantity({ _id, quantity: newQuantity }));
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
        nameCn: item.nameCn,
        nameEn: item.nameEn,
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
      const res = await dispatch(placeOrder(orderData)).unwrap();
      toast.success('下单成功，订单号：' + res.order.order_number);
      dispatch(clearCart());
    } catch (err) {
      toast.error('下单失败：' + err);
    }

    // try {
    //   const res = await fetch('http://localhost:5000/api/orders', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(orderData),
    //   });

    //   if (!res.ok) {
    //     const errData = await res.json();
    //     throw new Error(errData.message || '下单失败');
    //   }

    //   const data = await res.json();
    //   toast.success('订单提交成功！订单号：' + data.order.order_number);
    //   // 关键：清空购物车
    //   dispatch(clearCart());
    // } catch (error) {
    //   toast.error('下单出错: ' + error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Card className="w-[360px] text-center p-6 shadow-xl border-muted">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-muted rounded-full p-4">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Start adding some products to place your order.
            </p>
            <Link
              to="/"
              className="mt-2 inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              Browse Menu
            </Link>
          </CardContent>
        </Card>
      </div>
    );
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
            <React.Fragment key={_id}>
              {/* 电脑端：完整一行显示 */}
              <tr className="border-b hover:bg-gray-50 hidden sm:table-row">
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

              {/* 手机端：两行显示 */}
              <tr className="border-b hover:bg-gray-50 table-row sm:hidden">
                <td colSpan={5} className="p-2 font-semibold">
                  {nameCn} - {nameEn}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 table-row sm:hidden">
                <td className="p-2 text-center w-1/3">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(_id, Number(e.target.value))
                    }
                    className="w-20 text-center border rounded"
                  />
                </td>
                <td className="p-2 text-right w-1/3">
                  ￥{(price * quantity).toFixed(2)}
                </td>
                <td className="p-2 text-center w-1/3">
                  <button
                    onClick={() => handleRemove(_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    DELETE
                  </button>
                </td>
                {/* 剩余两个单元格留空，保持列数一致 */}
                <td></td>
                <td></td>
              </tr>
            </React.Fragment>
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
