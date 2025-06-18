// services/paymentService.js
import Order from '../models/Order.js';
import logger from '../utils/logger.js';

// 模拟调用第三方 Tyro 支付 SDK（需替换为真实 Tyro 集成）
async function initiateTyroPayment(paymentData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (Math.random() < 0.1) {
      throw new Error('Tyro 支付网络错误');
    }
    return {
      success: true,
      reference: `TYRO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      message: 'Tyro 支付已发起',
    };
  } catch (error) {
    logger.error('Tyro 支付调用失败', { error: error.message });
    return {
      success: false,
      error: error.message,
    };
  }
}

class PaymentService {
  static async processGooglePayPayment(order, paymentData) {
    // TODO: 实现 Google Pay 支付处理逻辑
    throw new Error('尚未实现 Google Pay 支付');
  }

  static async processApplePayPayment(order, paymentData) {
    // TODO: 实现 Apple Pay 支付处理逻辑
    throw new Error('尚未实现 Apple Pay 支付');
  }
  static async processPayment(orderId, paymentData) {
    try {
      if (!orderId) throw new Error('订单ID不能为空');
      if (!paymentData?.method) throw new Error('支付方式不能为空');

      const order = await Order.findById(orderId);
      if (!order) throw new Error('订单未找到');
      if (order.payment?.paid) throw new Error('订单已支付，无需重复支付');
      if (!order.total_price || order.total_price <= 0)
        throw new Error('订单金额异常');

      switch (paymentData.method) {
        case 'tyro':
          return await this.processTyroPayment(order, paymentData);
        case 'cash':
          return await this.processCashPayment(order, paymentData);
        case 'google_pay':
          return await this.processGooglePayPayment(order, paymentData);

        case 'apple_pay':
          return await this.processApplePayPayment(order, paymentData);
        case 'card':
          throw new Error(
            `${paymentData.method} 目前暂不支持，请使用 Tyro 或现金`
          );
        default:
          throw new Error('不支持的支付方式');
      }
    } catch (error) {
      logger.error('处理支付失败', {
        orderId,
        paymentData,
        error: error.message,
      });
      if (orderId) {
        try {
          await Order.findByIdAndUpdate(orderId, {
            'payment.status': 'failed',
            'payment.error_message': error.message,
            'payment.failed_at': new Date(),
          });
        } catch (updateError) {
          logger.error('更新支付状态失败', {
            updateError: updateError.message,
          });
        }
      }
      throw error;
    }
  }

  static async processTyroPayment(order, paymentData) {
    try {
      await Order.findByIdAndUpdate(order._id, {
        'payment.method': 'tyro',
        'payment.status': 'processing',
        'payment.requires_manual_confirmation': true,
        'payment.processing_started_at': new Date(),
      });

      const tyroResult = await initiateTyroPayment({
        ...paymentData,
        amount: order.total_price,
        currency: 'AUD',
        orderId: order._id,
      });

      if (!tyroResult.success) {
        await Order.findByIdAndUpdate(order._id, {
          'payment.status': 'failed',
          'payment.error_message': tyroResult.error,
          'payment.failed_at': new Date(),
        });
        logger.warn('Tyro 支付失败', {
          orderId: order._id,
          error: tyroResult.error,
        });
        throw new Error(`Tyro 支付失败: ${tyroResult.error}`);
      }

      await Order.findByIdAndUpdate(order._id, {
        'payment.external_reference': tyroResult.reference,
        'payment.tyro_initiated_at': new Date(),
      });

      logger.info('Tyro 支付处理中', {
        orderId: order._id,
        reference: tyroResult.reference,
      });

      return {
        success: true,
        message: 'Tyro 支付处理中，请手动确认',
        requiresConfirmation: true,
        reference: tyroResult.reference,
        orderId: order._id,
      };
    } catch (error) {
      logger.error('Tyro 支付过程失败', {
        orderId: order._id,
        error: error.message,
      });
      await Order.findByIdAndUpdate(order._id, {
        'payment.status': 'failed',
        'payment.error_message': error.message,
        'payment.failed_at': new Date(),
      });
      throw error;
    }
  }

  static async processCashPayment(order, paymentData) {
    try {
      await Order.findByIdAndUpdate(order._id, {
        'payment.method': 'cash',
        'payment.status': 'pending',
        'payment.requires_manual_confirmation': true,
        'payment.confirmation_notes': '等待人工确认现金支付',
        'payment.cash_payment_initiated_at': new Date(),
      });

      logger.info('现金支付发起成功', { orderId: order._id });

      return {
        success: true,
        message: '等待现金确认',
        requiresConfirmation: true,
        orderId: order._id,
      };
    } catch (error) {
      logger.error('现金支付过程失败', {
        orderId: order._id,
        error: error.message,
      });
      await Order.findByIdAndUpdate(order._id, {
        'payment.status': 'failed',
        'payment.error_message': error.message,
        'payment.failed_at': new Date(),
      });
      throw error;
    }
  }

  static async confirmPayment(orderId, confirmationData) {
    try {
      if (!orderId) throw new Error('订单ID不能为空');
      if (!confirmationData?.confirmedBy) throw new Error('确认人信息不能为空');

      const { confirmedBy, notes, amountReceived } = confirmationData;
      const order = await Order.findById(orderId);
      if (!order) throw new Error('订单未找到');
      if (order.payment?.paid) throw new Error('订单已支付，无需重复确认');
      if (!order.payment?.requires_manual_confirmation)
        throw new Error('该订单无需手动确认');

      const expectedAmount = order.total_price;
      const actualAmount = amountReceived || expectedAmount;

      if (actualAmount !== expectedAmount) {
        logger.warn('确认支付金额不一致', {
          orderId,
          expectedAmount,
          actualAmount,
        });
      }

      await Order.findByIdAndUpdate(orderId, {
        'payment.status': 'completed',
        'payment.paid': true,
        'payment.paid_at': new Date(),
        'payment.confirmed_by': confirmedBy,
        'payment.confirmation_notes': notes,
        'payment.amount_paid': actualAmount,
        'payment.requires_manual_confirmation': false,
      });

      logger.info('支付已确认', { orderId, amountPaid: actualAmount });

      return {
        success: true,
        message: '支付已确认',
        orderId,
        amountPaid: actualAmount,
      };
    } catch (error) {
      logger.error('确认支付失败', {
        orderId,
        confirmationData,
        error: error.message,
      });
      throw error;
    }
  }

  static async handleTyroWebhook(webhookData) {
    try {
      const { reference, status, amount } = webhookData;
      if (!reference) throw new Error('Webhook 缺少 reference');

      const order = await Order.findOne({
        'payment.external_reference': reference,
      });
      if (!order) throw new Error(`订单未找到: ${reference}`);
      if (order.payment?.webhook_received) {
        logger.info('Webhook 已处理过', { reference });
        return { received: true, message: 'Webhook 已处理过' };
      }

      await Order.findByIdAndUpdate(order._id, {
        'payment.webhook_received': true,
        'payment.webhook_received_at': new Date(),
      });

      if (status === 'completed') {
        await Order.findByIdAndUpdate(order._id, {
          'payment.status': 'completed',
          'payment.paid': true,
          'payment.paid_at': new Date(),
          'payment.amount_paid': amount,
          'payment.requires_manual_confirmation': false,
        });
        logger.info('Webhook 标记支付成功', { reference, orderId: order._id });
      } else if (status === 'failed') {
        await Order.findByIdAndUpdate(order._id, {
          'payment.status': 'failed',
          'payment.error_message': 'Tyro 支付失败',
          'payment.failed_at': new Date(),
        });
        logger.warn('Webhook 标记支付失败', { reference, orderId: order._id });
      }

      return { received: true, status };
    } catch (error) {
      logger.error('处理 Webhook 失败', { webhookData, error: error.message });
      throw error;
    }
  }

  static async getPaymentStatus(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) throw new Error('订单未找到');

      logger.info('查询支付状态', { orderId });

      return {
        orderId: order._id,
        paymentMethod: order.payment?.method,
        paymentStatus: order.payment?.status,
        paid: order.payment?.paid || false,
        requiresConfirmation:
          order.payment?.requires_manual_confirmation || false,
        totalAmount: order.total_price,
        paidAmount: order.payment?.amount_paid,
        paidAt: order.payment?.paid_at,
        reference: order.payment?.external_reference,
      };
    } catch (error) {
      logger.error('查询支付状态失败', { orderId, error: error.message });
      throw error;
    }
  }

  static async cancelPayment(orderId, reason) {
    try {
      const order = await Order.findById(orderId);
      if (!order) throw new Error('订单未找到');
      if (order.payment?.paid) throw new Error('已支付的订单无法取消');

      await Order.findByIdAndUpdate(orderId, {
        'payment.status': 'cancelled',
        'payment.cancelled_at': new Date(),
        'payment.cancellation_reason': reason,
      });

      logger.info('取消支付成功', { orderId, reason });

      return { success: true, message: '支付已取消' };
    } catch (error) {
      logger.error('取消支付失败', { orderId, reason, error: error.message });
      throw error;
    }
  }
}

export default PaymentService;
