import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItemFromCart,
  // updateItemQuantity,
} from '../features/cart/cartSlice'; // 假设你有这两个 action
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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

  if (cartItems.length === 0) {
    return <div>购物车空空如也，快去添加商品吧！</div>;
  }
  return (
    <div className="cart-page p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">购物车</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">商品名称</th>
            <th className="text-right p-2">单价</th>
            <th className="text-center p-2">数量</th>
            <th className="text-right p-2">小计</th>
            <th className="p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, nameCn, price, quantity }) => (
            <tr key={id} className="border-b hover:bg-gray-50">
              <td className="p-2">{nameCn}</td>
              <td className="p-2 text-right">￥{price.toFixed(2)}</td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(id, Number(e.target.value))
                  }
                  className="w-16 text-center border rounded"
                />
              </td>
              <td className="p-2 text-right">
                ￥{(price * quantity).toFixed(2)}
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleRemove(id)}
                  className="text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right font-bold p-2">
              总价：
            </td>
            <td className="text-right font-bold p-2">
              ￥{totalPrice.toFixed(2)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartPage;
