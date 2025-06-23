import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrder } from '@/features/order/orderSlice';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import toast from 'react-hot-toast';
const OrderDetailsModal = ({ open, onClose, order, onStatusChange }) => {
  const [remarks, setRemarks] = useState(order?.remarks || '');
  const [diningType, setDiningType] = useState(order?.dining_type || 'dine_in');
  const dispatch = useDispatch();

  const handleUpdate = async (newStatus) => {
    try {
      const resultAction = await dispatch(
        updateOrder({
          id: order._id,
          updates: {
            status: newStatus,
            // remarks,
            dining_type: diningType, // ✅ 加上这个
          },
        })
      );

      if (updateOrder.fulfilled.match(resultAction)) {
        toast.success('订单更新成功');
        onClose(); // 可选，更新后关闭
      } else {
        toast.error(resultAction.payload || '更新失败');
      }
    } catch (err) {
      toast.error('更新失败: ' + err.message);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>订单详情：{order.order_number}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            <strong>顾客：</strong>
            {order.customer_info?.name || '无名'}
          </p>
          <p>
            <strong>桌号：</strong>
            {order.table_number || '—'}
          </p>
          <p>
            <strong>来源：</strong>
            {order.source}
          </p>
          {/* 用餐方式 */}
          <div className="mt-4">
            <Label>用餐方式</Label>
            <Select
              value={diningType}
              onValueChange={(value) => setDiningType(value)}
            >
              <SelectTrigger className="w-[200px] mt-1">
                <SelectValue placeholder="选择用餐方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dine_in">堂食</SelectItem>
                <SelectItem value="takeaway">外带</SelectItem>
                <SelectItem value="delivery">配送</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p>
            <strong>支付：</strong>
            {order.payment_status || '未支付'}
          </p>
          <p>
            <strong>下单时间：</strong>
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <div className="my-4">
          <h3 className="font-semibold mb-2">菜品明细</h3>
          <ul className="space-y-1">
            {order.items.map((item) => (
              <li key={item.menu_item_id}>
                {item.nameCn} x {item.quantity} —— ￥{item.subtotal.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label htmlFor="remarks">备注</Label>
          <Textarea
            id="remarks"
            placeholder="可输入特殊说明"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="mt-1"
          />
        </div>

        <DialogFooter className="flex justify-between pt-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => handleUpdate('processing')}
            >
              接单
            </Button>
            <Button variant="outline" onClick={() => handleUpdate('completed')}>
              完成
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleUpdate('cancelled')}
            >
              取消
            </Button>
          </div>
          <Button onClick={onClose}>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
