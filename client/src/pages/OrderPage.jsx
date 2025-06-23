// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrders } from '../features/order/orderSlice'; // ✅ 这是对的

// const OrderPage = () => {
//   const dispatch = useDispatch();
//   const { list: orders, loading, error } = useSelector((state) => state.orders);
//   console.log(orders);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, []);

//   if (loading) return <div>加载中...</div>;
//   if (orders.length === 0) return <div>暂无订单</div>;
//   return (
//     <div>
//       <h1>ORDER LIST</h1>
//       <table border="1" cellPadding="8">
//         <thead>
//           <tr>
//             <th>订单号</th>
//             <th>顾客姓名</th>
//             <th>订单状态</th>
//             <th>总价</th>
//             <th>下单时间</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order.order_number}</td>
//               <td>{order.customer_info?.name || '无名'}</td>
//               <td>{order.status}</td>
//               <td>¥{order.total_price.toFixed(2)}</td>
//               <td>{new Date(order.created_at).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderPage;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/order/orderSlice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import OrderDetailsModal from '@/components/OrderDetailsModal';

const OrderPage = () => {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const handleStatusChange = (newStatus) => {
    if (!selectedOrder) return;
    dispatch(updateOrderStatus({ id: selectedOrder._id, status: newStatus }));
    setSelectedOrder(null); // 关闭 modal
  };
  if (loading) return <div>加载中...</div>;
  if (!orders || orders.length === 0) return <div>暂无订单</div>;

  // 按桌号分组并按时间排序（每桌可能多次下单）
  const sortedOrders = [...orders].sort((a, b) => {
    const tableA = a.customer_info?.table_number || '';
    const tableB = b.customer_info?.table_number || '';
    if (tableA < tableB) return -1;
    if (tableA > tableB) return 1;
    return new Date(b.created_at) - new Date(a.created_at); // 最新的排前面
  });

  const getSourceLabel = (source) => {
    const map = {
      customer_web: '扫码',
      staff_web: '店员',
      phone_order: '电话',
      uber_eats: 'UberEats',
      doordash: 'DoorDash',
      panda: 'Panda',
      menulog: 'Menulog',
    };
    return map[source] || source;
  };

  const getPaymentBadge = (paid) => (
    <Badge variant={paid ? 'success' : 'destructive'}>
      {paid ? '已支付' : '未支付'}
    </Badge>
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4 text-center">ORDER LIST</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">订单号</th>
            <th className="p-2 border">用餐方式</th>
            <th className="p-2 border">桌号</th>
            <th className="p-2 border">来源</th>
            <th className="p-2 border">支付</th>
            <th className="p-2 border">总价</th>
            <th className="p-2 border">下单时间</th>
            <th className="p-2 border">查看</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr
              key={order._id}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-300`}
            >
              <td className="p-2 border">{order.order_number}</td>
              <td className="p-2 border">
                {/* {order.customer_info?.name || '无名'} */}
                {order.dining_type}
              </td>
              <td className="p-2 border">
                {order.customer_info?.table_number || '—'}
              </td>
              <td className="p-2 border">
                <Badge>{getSourceLabel(order.source)}</Badge>
              </td>
              <td className="p-2 border">
                {getPaymentBadge(order.payment?.paid)}
              </td>
              <td className="p-2 border">¥{order.total_price.toFixed(2)}</td>
              <td className="p-2 border">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td>
                <Button
                  variant="outline"
                  size="sm"
                  className=" text-amber-500 hover:text-amber-600 border px-5 py-2 rounded-md"
                  onClick={() => setSelectedOrder(order)}
                >
                  详情
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 详情 Modal */}
      <OrderDetailsModal
        open={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrderPage;
