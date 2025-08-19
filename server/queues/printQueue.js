import amqp from 'amqplib';
import Order from '../models/Order.js';

const RABBIT_URL = 'amqp://localhost';
let channel;

// 连接 RabbitMQ 并启动 worker
export async function connectQueue() {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('printQueue', { durable: true });

    console.log('✅ RabbitMQ connected and queue asserted.');

    startPrintWorker();
  } catch (err) {
    console.error('❌ RabbitMQ connection error:', err);
    setTimeout(connectQueue, 5000);
  }
}

// 入队函数
export async function enqueuePrint(printer, item, orderId) {
  if (!channel) {
    console.warn('⚠️ Channel not ready, retrying in 500ms...');
    setTimeout(() => enqueuePrint(printer, item, orderId), 500);
    return;
  }

  const payload = { printer, item, orderId };
  channel.sendToQueue('printQueue', Buffer.from(JSON.stringify(payload)), {
    persistent: true
  });
}

// 消费 worker
export async function startPrintWorker() {
  if (!channel) return;

  channel.consume('printQueue', async (msg) => {
    if (!msg) return;

    const { printer, item, orderId } = JSON.parse(msg.content.toString());

    try {
      await simulatePrint(item, orderId, printer);
      await updateOrderPrintStatus(orderId, item._id, 'printed');
      channel.ack(msg);
    } catch (err) {
      console.error('❌ Print failed:', err);
      await updateOrderPrintStatus(orderId, item._id, 'failed');
      channel.nack(msg, false, true);
    }
  }, { noAck: false });

  console.log('🖨️ Print worker started.');
}

// 模拟打印
async function simulatePrint(item, orderId, printer) {
  console.log(`Printing ${item.name} for order ${orderId} on ${printer}`);
  return new Promise(resolve => setTimeout(resolve, 100));
}

// 更新订单打印状态
async function updateOrderPrintStatus(orderId, itemId, status) {
  const order = await Order.findById(orderId);
  if (!order) return;

  const item = order.items.id(itemId);
  if (!item) return;

  item.print_status = status;

  if (order.items.every(i => i.print_status === 'printed')) {
    order.print_status = 'printed';
  } else if (order.items.some(i => i.print_status === 'failed')) {
    order.print_status = 'partially_failed';
  } else if (order.items.some(i => i.print_status === 'printing')) {
    order.print_status = 'printing';
  }

  await order.save();
}
