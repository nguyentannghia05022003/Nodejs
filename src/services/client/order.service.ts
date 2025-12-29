import { NotFoundError, BadRequestError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { Order, OrderStatus } from 'entities/Order.entity';
import { OrderItem } from 'entities/OrderItem.entity';
import { Product } from 'entities/Product.entity';
import { getSkip } from '../../utils/pagination';
import { CreateOrderDTO, OrderItemDTO } from '../../models/dto/order.dto';
import { In } from 'typeorm';

export class ClientOrderService {
  private orderRepo = AppDataSource.getRepository(Order);
  private orderItemRepo = AppDataSource.getRepository(OrderItem);
  private productRepo = AppDataSource.getRepository(Product);

  private formatOrderCode(id: number): string {
    return `ORD${String(id).padStart(10, '0')}`;
  }

  async createOrder(customerId: number, data: CreateOrderDTO) {
    const { items } = data;

    const productIds = items.map(item => item.productId);
    const products = await this.productRepo.find({
      where: { id: In(productIds), isDeleted: false }
    });

    if (products.length !== items.length) {
      throw new NotFoundError('Một số sản phẩm không tồn tại hoặc đã bị xóa');
    }

    const totalAmount = OrderItemDTO.calculateTotalAmount(items, products);

    const order = this.orderRepo.create({
      totalAmount,
      status: OrderStatus.Pending,
      isDeleted: false,
      customer: { id: customerId } as any,
    });
    const savedOrder = await this.orderRepo.save(order);

    const orderCode = this.formatOrderCode(savedOrder.id);
    savedOrder.orderCode = orderCode;
    await this.orderRepo.save(savedOrder);

    const orderItemsData = OrderItemDTO.toOrderItems(items, products, savedOrder.id);
    const orderItems = orderItemsData.map((data) => this.orderItemRepo.create(data));
    await this.orderItemRepo.save(orderItems);

    const orderWithItems = await this.orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });

    return orderWithItems;
  }

  async getMyOrders(customerId: number, page: number, limit: number, status?: string) {
    const skip = getSkip(page, limit);
    const where: any = { customer: { id: customerId }, isDeleted: false };

    if (status) where.status = status;

    const [data, total] = await this.orderRepo.findAndCount({
      where,
      relations: ['items'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async getMyOrderById(customerId: number, orderId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: Number(orderId), customer: { id: customerId }, isDeleted: false },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundError('Không tìm thấy đơn hàng');
    }

    return order;
  }

  async cancelOrder(customerId: number, orderId: string) {
    const order = await this.orderRepo.findOne({
      where: {
        id: Number(orderId),
        customer: { id: customerId },
        isDeleted: false
      },
    });

    if (!order) {
      throw new NotFoundError('Không tìm thấy đơn hàng');
    }

    if (order.status !== OrderStatus.Pending && order.status !== OrderStatus.Confirmed) {
      throw new BadRequestError(
        `Không thể hủy đơn hàng ở trạng thái ${order.status}. Chỉ có thể hủy đơn hàng ở trạng thái pending hoặc confirmed.`
      );
    }

    order.status = OrderStatus.Cancelled;
    await this.orderRepo.save(order);

    const cancelledOrder = await this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items'],
    });

    return cancelledOrder;
  }

  async getOrderSummaryByStatus(customerId: number) {
    try {
      const orders = await this.orderRepo.find({
        where: { customer: { id: customerId }, isDeleted: false },
      });

      const summary = {
        [OrderStatus.Pending]: { count: 0, totalAmount: 0 },
        [OrderStatus.Confirmed]: { count: 0, totalAmount: 0 },
        [OrderStatus.Shipping]: { count: 0, totalAmount: 0 },
        [OrderStatus.Delivered]: { count: 0, totalAmount: 0 },
        [OrderStatus.Cancelled]: { count: 0, totalAmount: 0 },
      };

      orders.forEach((order) => {
        const status = order.status;
        summary[status].count += 1;
        summary[status].totalAmount += Number(order.totalAmount) || 0;
      });

      const totalOrders = orders.length;
      const totalAmount = orders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);

      return {
        byStatus: summary,
        total: {
          orders: totalOrders,
          amount: totalAmount,
        },
      };
    } catch (error: any) {
      throw error;
    }
  }
}

