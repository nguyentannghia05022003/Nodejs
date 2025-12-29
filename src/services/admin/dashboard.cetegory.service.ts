import { AppDataSource } from 'config/db';
import { Category } from '../../entities/Category.entity';
import { Product } from '../../entities/Product.entity';
import { OrderItem } from '../../entities/OrderItem.entity';
import { Order, OrderStatus } from '../../entities/Order.entity';

export class DashboardCategoryService {
    private categoryRepo = AppDataSource.getRepository(Category);
    private productRepo = AppDataSource.getRepository(Product);
    private orderItemRepo = AppDataSource.getRepository(OrderItem);

    async getCategoryDashboard() {
        const result = await this.categoryRepo
            .createQueryBuilder('category')
            .leftJoin(Product, 'product', 'product.categoryId = category.id AND product.isDeleted = false')
            .leftJoin(OrderItem, 'orderItem', 'orderItem.productId = product.id')
            .leftJoin(Order, 'order', 'order.id = orderItem.orderId AND order.isDeleted = false AND order.status != :cancelled', { cancelled: OrderStatus.Cancelled })
            .select('category.id', 'categoryId')
            .addSelect('category.categoryCode', 'categoryCode')
            .addSelect('category.name', 'categoryName')
            .addSelect('COUNT(DISTINCT product.id)', 'productCount')
            .addSelect('COALESCE(SUM(orderItem.price * orderItem.quantity), 0)', 'revenue')
            .where('category.isDeleted = false')
            .groupBy('category.id')
            .addGroupBy('category.categoryCode')
            .addGroupBy('category.name')
            .orderBy('revenue', 'DESC')
            .getRawMany();

        return result.map((item) => ({
            categoryId: item.categoryId,
            categoryCode: item.categoryCode,
            categoryName: item.categoryName,
            productCount: Number(item.productCount || 0),
            revenue: Number(item.revenue || 0),
        }));
    }
}