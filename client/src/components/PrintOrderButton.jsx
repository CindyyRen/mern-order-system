import React from 'react';
import { Button } from './ui/Button';

export default function PrintOrderButton({ order }) {
  const handlePrint = () => {
    if (!order) return;

    const printWindow = window.open('', '_blank', 'width=300,height=600');

    const html = `
      <html>
        <head>
          <title>打印订单</title>
          <style>
            body {
              font-family: 'SimSun', 'Source Han Sans', sans-serif;
              font-size: 12px;
              line-height: 1.4;
              width: 58mm;
              margin: 0;
              padding: 10px;
            }
            h3 {
              text-align: center;
              margin-bottom: 8px;
            }
            hr {
              margin: 10px 0;
              border: none;
              border-top: 1px dashed #000;
            }
            .item {
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>
        <body>
          <h3>订单号：${order._id}</h3>
          <p>桌号：${order.table_number || '无'}</p>
          <p>状态：${order.status}</p>
          <hr />
          ${order.items
            .map(
              (item) => `
            <div class="item">
              <span>${item.nameCn} x${item.quantity}</span>
              <span>$${item.subtotal.toFixed(2)}</span>
            </div>
          `
            )
            .join('')}
          <hr />
          <p>总金额：$${order.total_price.toFixed(2)}</p>
          <p>支付方式：${order.payment?.method || '未支付'}</p>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <Button
      onClick={handlePrint}
      variant="ghost"
      size="sm"
      className="text-gray-500 hover:text-gray-600"
      type="button"
    >
      打印
    </Button>
  );
}
