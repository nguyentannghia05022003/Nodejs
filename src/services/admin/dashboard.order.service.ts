import { AppDataSource } from 'config/db';
import { Order, OrderStatus } from '../../entities/Order.entity';
import { toUnix } from '../../utils/time';
import dayjs from 'dayjs';

export class DashboardOrderService {
  private orderRepo = AppDataSource.getRepository(Order);

  async getRevenueByDate(days: number = 7) {
    const startDate = dayjs().subtract(days - 1, 'day').startOf('day').toDate();
    const endDate = dayjs().endOf('day').toDate();

    const result = await this.orderRepo
      .createQueryBuilder('order')
      .select('DATE(order.createdAt)', 'date')
      .addSelect('COUNT(order.id)', 'orderCount')
      .addSelect('COALESCE(SUM(order.totalAmount), 0)', 'revenue')
      .where('order.isDeleted = false')
      .andWhere('order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
      .andWhere('DATE(order.createdAt) >= DATE(:startDate)', { startDate })
      .andWhere('DATE(order.createdAt) <= DATE(:endDate)', { endDate })
      .groupBy('DATE(order.createdAt)')
      .orderBy('DATE(order.createdAt)', 'DESC')
      .getRawMany();

    return result.map((item) => ({
      date: item.date,
      orderCount: Number(item.orderCount || 0),
      revenue: Number(item.revenue || 0),
      unixTimestamp: toUnix(item.date),
    }));
  }

  async getRevenueByStatus() {
    const result = await this.orderRepo
      .createQueryBuilder('order')
      .select('order.status', 'status')
      .addSelect('COUNT(order.id)', 'orderCount')
      .addSelect('COALESCE(SUM(order.totalAmount), 0)', 'revenue')
      .where('order.isDeleted = false')
      .groupBy('order.status')
      .getRawMany();

    const statusMap = {
      [OrderStatus.Pending]: { count: 0, totalAmount: 0 },
      [OrderStatus.Confirmed]: { count: 0, totalAmount: 0 },
      [OrderStatus.Shipping]: { count: 0, totalAmount: 0 },
      [OrderStatus.Delivered]: { count: 0, totalAmount: 0 },
      [OrderStatus.Cancelled]: { count: 0, totalAmount: 0 },
    };

    let totalOrders = 0;
    let totalRevenue = 0;

    result.forEach((item) => {
      const count = Number(item.orderCount || 0);
      const revenue = Number(item.revenue || 0);
      statusMap[item.status] = { orderCount: count, revenue };
      totalOrders += count;
      totalRevenue += revenue;
    });

    return {
      ...statusMap,
      total: {
        orderCount: totalOrders,
        revenue: totalRevenue,
      },
    };
  }


  async getTodayComparison() {
    const today = dayjs().startOf('day');
    const sameDayLastMonth = today.subtract(1, 'month').startOf('day');

    const todayStart = today.toDate();
    const todayEnd = today.endOf('day').toDate();
    const lastMonthStart = sameDayLastMonth.toDate();
    const lastMonthEnd = sameDayLastMonth.endOf('day').toDate();

    const [todayData, lastMonthData] = await Promise.all([
      // Query cho hôm nay
      this.orderRepo
        .createQueryBuilder('order')
        .select('COUNT(order.id)', 'orderCount')
        .addSelect('COALESCE(SUM(order.totalAmount), 0)', 'revenue')
        .where('order.isDeleted = false')
        .andWhere('order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
        .andWhere('DATE(order.createdAt) = DATE(:date)', { date: todayStart })
        .getRawOne(),

      // Query cho cùng ngày tháng trước
      this.orderRepo
        .createQueryBuilder('order')
        .select('COUNT(order.id)', 'orderCount')
        .addSelect('COALESCE(SUM(order.totalAmount), 0)', 'revenue')
        .where('order.isDeleted = false')
        .andWhere('order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
        .andWhere('DATE(order.createdAt) = DATE(:date)', { date: lastMonthStart })
        .getRawOne(),
    ]);

    const todayOrderCount = Number(todayData?.orderCount || 0);
    const todayRevenue = Number(todayData?.revenue || 0);
    const lastMonthOrderCount = Number(lastMonthData?.orderCount || 0);
    const lastMonthRevenue = Number(lastMonthData?.revenue || 0);

    // Tính phần trăm thay đổi
    const orderCountChange = todayOrderCount - lastMonthOrderCount;
    const revenueChange = todayRevenue - lastMonthRevenue;
    const orderCountChangePercent =
      lastMonthOrderCount > 0
        ? Number(((orderCountChange / lastMonthOrderCount) * 100).toFixed(2))
        : todayOrderCount > 0 ? 100 : 0;
    const revenueChangePercent =
      lastMonthRevenue > 0
        ? Number(((revenueChange / lastMonthRevenue) * 100).toFixed(2))
        : todayRevenue > 0 ? 100 : 0;

    // Xác định trend
    let trend: 'up' | 'down' | 'same' = 'same';
    if (orderCountChange > 0 || revenueChange > 0) trend = 'up';
    else if (orderCountChange < 0 || revenueChange < 0) trend = 'down';

    return {
      today: {
        date: today.format('YYYY-MM-DD'),
        orderCount: todayOrderCount,
        revenue: todayRevenue,
        unixTimestamp: toUnix(todayStart),
      },
      sameDayLastMonth: {
        date: sameDayLastMonth.format('YYYY-MM-DD'),
        orderCount: lastMonthOrderCount,
        revenue: lastMonthRevenue,
        unixTimestamp: toUnix(lastMonthStart),
      },
      comparison: {
        orderCountChange,
        orderCountChangePercent,
        revenueChange,
        revenueChangePercent,
        trend,
      },
    };
  }
}

