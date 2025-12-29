import { NotFoundError, BadRequestError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { Order, OrderStatus } from 'entities/Order.entity';
import { OrderItem } from 'entities/OrderItem.entity';
import { Customer } from 'entities/Customer.entity';
import { Product } from 'entities/Product.entity';
import { Like, In } from 'typeorm';
import { getSkip } from '../../utils/pagination';
import { AdminCreateOrderDTO, OrderItemDTO } from '../../models/dto/order.dto';

export class AdminOrderService {
  private orderRepo = AppDataSource.getRepository(Order);
  private orderItemRepo = AppDataSource.getRepository(OrderItem);
  private customerRepo = AppDataSource.getRepository(Customer);
  private productRepo = AppDataSource.getRepository(Product);

  private formatOrderCode(id: number): string {
    return `ORD${String(id).padStart(10, '0')}`;
  }

  async getAll(page: number, limit: number, status?: string, search?: string) {
    const skip = getSkip(page, limit);
    const where: any = { isDeleted: false };

    if (status) where.status = status;
    if (search) where.orderCode = Like(`%${search}%`);

    const [data, total] = await this.orderRepo.findAndCount({
      where,
      relations: ['customer', 'items'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async getById(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id: Number(id), isDeleted: false },
      relations: ['customer', 'items'],
    });

    if (!order) throw new NotFoundError('Không tìm thấy đơn hàng');
    return order;
  }

  async createOrder(data: AdminCreateOrderDTO) {
    const { customerId, items } = data;

    const customer = await this.customerRepo.findOne({
      where: { id: customerId, isDeleted: false },
    });
    if (!customer) {
      throw new NotFoundError('Khách hàng không tồn tại');
    }

    const productIds = items.map((item) => item.productId);
    const products = await this.productRepo.find({
      where: { id: In(productIds), isDeleted: false },
    });

    if (products.length !== items.length) {
      throw new NotFoundError('Một số sản phẩm không tồn tại hoặc đã bị xóa');
    }

    // Tính tổng tiền từ items và giá sản phẩm trong database
    const totalAmount = OrderItemDTO.calculateTotalAmount(items, products);

    const order = this.orderRepo.create({
      customer,
      totalAmount,
      status: OrderStatus.Pending,
      isDeleted: false,
    });

    const savedOrder = await this.orderRepo.save(order);

    const orderCode = this.formatOrderCode(savedOrder.id);
    savedOrder.orderCode = orderCode;
    await this.orderRepo.save(savedOrder);

    const orderItemsData = OrderItemDTO.toOrderItems(items, products, savedOrder.id);
    const orderItems = orderItemsData.map((data) => this.orderItemRepo.create(data));
    await this.orderItemRepo.save(orderItems);

    return await this.orderRepo.findOne({
      where: { id: savedOrder.id },
      relations: ['customer', 'items'],
    });
  }

  async updateStatus(id: string, newStatus: OrderStatus) {
    const order = await this.orderRepo.findOne({ where: { id: Number(id), isDeleted: false } });

    if (!order) throw new NotFoundError('Không tìm thấy đơn hàng');

    if (order.status === OrderStatus.Delivered || order.status === OrderStatus.Cancelled) {
      throw new BadRequestError(`Đơn hàng đã ${order.status}, không thể thay đổi`);
    }

    let isAllowed = false;
    if (order.status === OrderStatus.Pending) {
      if (newStatus === OrderStatus.Confirmed || newStatus === OrderStatus.Cancelled) {
        isAllowed = true;
      }
    } else if (order.status === OrderStatus.Confirmed) {
      if (newStatus === OrderStatus.Shipping || newStatus === OrderStatus.Cancelled) {
        isAllowed = true;
      }
    } else if (order.status === OrderStatus.Shipping) {
      if (newStatus === OrderStatus.Delivered) {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      throw new BadRequestError(`Không thể chuyển từ ${order.status} -> ${newStatus}`);
    }

    order.status = newStatus;
    await this.orderRepo.save(order);
    return order;
  }

  async delete(id: string) {
    const order = await this.orderRepo.findOne({ where: { id: Number(id), isDeleted: false } });
    if (!order) throw new NotFoundError('Không tìm thấy đơn hàng');

    if (order.status === OrderStatus.Shipping) {
      throw new BadRequestError(
        `Không thể xóa đơn hàng ở trạng thái ${order.status}.`
      );
    }

    order.isDeleted = true;
    await this.orderRepo.save(order);
  }
}
