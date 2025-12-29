import { AppDataSource } from 'config/db';
import { Order, OrderStatus } from '../../entities/Order.entity';
import { Customer } from '../../entities/Customer.entity';
import { toUnix } from '../../utils/time';

export class DashboardCustomerService {
  private orderRepo = AppDataSource.getRepository(Order);

  async getTopCustomersByOrderCount(limit: number = 10) {
    const result = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoin(Customer, 'customer', 'customer.id = order.customerId AND customer.isDeleted = false')
      .select('customer.id', 'customerId')
      .addSelect('customer.fullName', 'fullName')
      .addSelect('customer.email', 'email')
      .addSelect('customer.phone', 'phone')
      .addSelect('COUNT(order.id)', 'orderCount')
      .where('order.isDeleted = false')
      .andWhere('order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
      .groupBy('customer.id')
      .addGroupBy('customer.fullName')
      .addGroupBy('customer.email')
      .addGroupBy('customer.phone')
      .orderBy('orderCount', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map((item) => ({
      customerId: Number(item.customerId),
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      orderCount: Number(item.orderCount),
      // totalRevenue: Number(item.totalRevenue) || 0,
    }));
  }

  async getTopCustomersByRevenue(limit: number = 10) {
    const result = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoin(Customer, 'customer', 'customer.id = order.customerId AND customer.isDeleted = false')
      .select('customer.id', 'customerId')
      .addSelect('customer.fullName', 'fullName')
      .addSelect('customer.email', 'email')
      .addSelect('customer.phone', 'phone')
      .addSelect('SUM(order.totalAmount)', 'totalRevenue')
      .where('order.isDeleted = false')
      .andWhere('order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
      .groupBy('customer.id')
      .addGroupBy('customer.fullName')
      .addGroupBy('customer.email')
      .addGroupBy('customer.phone')
      .orderBy('totalRevenue', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map((item) => ({
      customerId: Number(item.customerId),
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      // orderCount: Number(item.orderCount),
      totalRevenue: Number(item.totalRevenue) || 0,
    }));
  }

  async getCustomerPurchaseCycle(customerId?: number) {
    const query = this.orderRepo
      .createQueryBuilder('order')
      .leftJoin(Customer, 'customer', 'customer.id = order.customerId AND customer.isDeleted = false')
      .select('customer.id', 'customerId')
      .addSelect('customer.fullName', 'fullName')
      .addSelect('customer.email', 'email')
      .addSelect('COUNT(order.id)', 'orderCount')
      .addSelect('MIN(order.createdAt)', 'firstOrderDate')
      .addSelect('MAX(order.createdAt)', 'lastOrderDate')
      .where('order.isDeleted = false')
      .andWhere('order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
      .groupBy('customer.id')
      .addGroupBy('customer.fullName')
      .addGroupBy('customer.email')
      .having('COUNT(order.id) > 1');

    if (customerId) {
      query.andWhere('customer.id = :customerId', { customerId });
    }

    const result = await query.getRawMany();

    return result.map((item) => {
      const orderCount = Number(item.orderCount);
      const firstOrderUnix = toUnix(item.firstOrderDate);
      const lastOrderUnix = toUnix(item.lastOrderDate);

      // Tính số ngày giữa đơn đầu và đơn cuối ( ngày = 86400 giây)
      const daysDiff = Math.floor((lastOrderUnix - firstOrderUnix) / 86400);

      // Chu kỳ mua hàng trung bình = số ngày / (số đơn)
      const averageCycle = orderCount > 1 ? Math.round(daysDiff / (orderCount)) : 0;

      return {
        customerId: Number(item.customerId),
        fullName: item.fullName,
        email: item.email,
        orderCount,
        firstOrderDate: firstOrderUnix,
        lastOrderDate: lastOrderUnix,
        averageCycleDays: averageCycle,
        totalDays: daysDiff,
      };
    });
  }

  async getCustomerDashboard(limit: number = 10) {
    const [topByOrderCount, topByRevenue, purchaseCycles] = await Promise.all([
      this.getTopCustomersByOrderCount(limit),
      this.getTopCustomersByRevenue(limit),
      this.getCustomerPurchaseCycle(),
    ]);

    return {
      topCustomersByOrderCount: topByOrderCount,
      topCustomersByRevenue: topByRevenue,
      purchaseCycles: purchaseCycles,
    };
  }
}

