import { AppDataSource } from 'config/db';
import { Product } from '../../entities/Product.entity';
import { Category } from '../../entities/Category.entity';
import { OrderItem } from '../../entities/OrderItem.entity';
import { Order, OrderStatus } from '../../entities/Order.entity';

export class DashboardProductService {
    private productRepo = AppDataSource.getRepository(Product);
    private orderItemRepo = AppDataSource.getRepository(OrderItem);

    async getProductsDashboard(categoryId?: number) {
        const query = this.productRepo
            .createQueryBuilder('product')
            .leftJoin(Category, 'category', 'category.id = product.categoryId')
            .leftJoin(OrderItem, 'orderItem', 'orderItem.productId = product.id')
            .leftJoin(Order, 'order', 'order.id = orderItem.orderId AND order.isDeleted = false AND order.status != :cancelled',
                { cancelled: OrderStatus.Cancelled })
            .select('product.id', 'productId')
            .addSelect('product.name', 'productName')
            .addSelect('product.price', 'price')
            .addSelect('category.id', 'categoryId')
            .addSelect('COALESCE(SUM(orderItem.quantity), 0)', 'soldQuantity')
            .addSelect('COALESCE(SUM(orderItem.price * orderItem.quantity), 0)', 'revenue')
            .where('product.isDeleted = false')
            .groupBy('product.id')
            .addGroupBy('product.name')
            .addGroupBy('product.price')
            .addGroupBy('category.id')
            .orderBy('soldQuantity', 'DESC');

        if (categoryId) {
            query.andWhere('category.id = :categoryId', { categoryId });
        }

        const result = await query.getRawMany();

        return result.map((item) => ({
            productId: Number(item.productId),
            productName: item.productName,
            price: Number(item.price),
            categoryId: item.categoryId ? Number(item.categoryId) : null,
            soldQuantity: Number(item.soldQuantity),
            revenue: Number(item.revenue || 0),
        }));
    }
}