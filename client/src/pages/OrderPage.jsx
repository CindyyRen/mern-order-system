import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/order/orderSlice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import Pagination from '@/components/Pagination';
import OrderDatePicker from '@/components/OrderDatePicker';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { ArrowDown, ArrowUp } from 'lucide-react';
import dayjs from 'dayjs';

const statusColorMap = {
  pending: 'text-red-500',
  processing: 'text-blue-500',
  completed: 'text-green-600',
  cancelled: 'text-gray-400',
  failed: 'text-red-500',
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    list: orders,
    totalCount,
    status,
    error,
  } = useSelector((state) => state.orders);
  console.log(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const pageSize = 10;
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDate = searchParams.get('date') || dayjs().format('YYYY-MM-DD');

  const sortBy = searchParams.get('sortField') || 'created_at';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  useEffect(() => {
    if (!searchParams.get('date')) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('date', dayjs().format('YYYY-MM-DD'));
        return next;
      });
    }
  }, []);
  useEffect(() => {
    const date = searchParams.get('date') || dayjs().format('YYYY-MM-DD');
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 10;
    const sortField = searchParams.get('sortField') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    dispatch(
      fetchOrders({
        date,
        search,
        page,
        pageSize,
        sortField,
        sortOrder,
      })
    );
  }, [searchParams]);

  const handleStatusChange = (newStatus) => {
    if (!selectedOrder) return;
    dispatch(updateOrderStatus({ id: selectedOrder._id, status: newStatus }));
    setSelectedOrder(null);
  };
  const handleSortClick = (field) => {
    const currentSortBy = searchParams.get('sortField');
    const currentOrder = searchParams.get('sortOrder') || 'desc';
    const nextOrder =
      currentSortBy === field && currentOrder === 'asc' ? 'desc' : 'asc';

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('sortField', field); // ✅ 使用传入字段
      next.set('sortOrder', nextOrder); // ✅ 自动切换顺序
      next.set('page', 1);
      return next;
    });
  };
  // 日期变化
  const handleDateChange = (newDate) => {
    const formatted = dayjs(newDate).format('YYYY-MM-DD');
    const current = searchParams.get('date');

    if (current === formatted) return; // ⛔️ 不变就不要 set，防止死循环

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('date', formatted);
      next.set('page', 1);
      return next;
    });
  };

  // 搜索变化
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('search', keyword);
      next.set('page', 1);
      return next;
    });
  };
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', newPage);
      return next;
    });
  };
  if (status === 'loading') return <div>加载中...</div>;
  if (status === 'failed') return <div>出错了：{error}</div>;
  if (!orders || orders.length === 0) return <div>暂无订单</div>;

  const totalPages = Math.ceil(totalCount / pageSize);

  // // 按桌号分组并按时间排序（每桌可能多次下单）
  // const sortedOrders = [...orders].sort((a, b) => {
  //   const tableA = a.customer_info?.table_number || '';
  //   const tableB = b.customer_info?.table_number || '';
  //   if (tableA < tableB) return -1;
  //   if (tableA > tableB) return 1;
  //   return new Date(b.created_at) - new Date(a.created_at); // 最新的排前面
  // });
  const sortedOrders = orders;

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
    <div className="p-2">
      {/* <h1 className="text-xl font-semibold mb-4 text-center">ORDER LIST</h1> */}
      {/* 顶部工具栏 */}
      <div className="flex">
        <div className="flex items-center gap-3 py-4">
          <span className="text-sm font-medium text-muted-foreground">
            筛选日期：
          </span>
          <OrderDatePicker
            value={dayjs(selectedDate).toDate()}
            onChange={handleDateChange}
          />
        </div>
        {/* 搜索框 */}
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium text-muted-foreground">
            搜索：
          </span>
          <Input
            placeholder="搜索桌号、电话、姓名…"
            value={searchParams.get('search') || ''}
            onChange={handleSearchChange}
            className="w-64"
          />
        </div>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">订单号</th>
            <th
              className="p-2 border cursor-pointer select-none"
              onClick={() => handleSortClick('status')}
            >
              状态
              {sortBy === 'status' &&
                (sortOrder === 'asc' ? (
                  <ArrowUp className="inline w-4 h-4 ml-1" />
                ) : (
                  <ArrowDown className="inline w-4 h-4 ml-1" />
                ))}
            </th>
            <th className="p-2 border">用餐方式</th>
            <th className="p-2 border">桌号</th>
            <th className="p-2 border">来源</th>
            <th className="p-2 border">支付</th>
            <th
              className="p-2 border"
              onClick={() => handleSortClick('total_price')}
            >
              总价{' '}
              {sortBy === 'total_price' &&
                (sortOrder === 'asc' ? (
                  <ArrowUp className="inline w-4 h-4 ml-1" />
                ) : (
                  <ArrowDown className="inline w-4 h-4 ml-1" />
                ))}
            </th>
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
              {/* <td className="p-2 border">{order.status}</td> */}
              <td className="border px-2 py-1">
                <span
                  className={`text-sm font-medium ${
                    statusColorMap[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </td>
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
              <td className="p-2 border">${order.total_price.toFixed(2)}</td>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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
