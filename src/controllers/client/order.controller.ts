import { Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';
import { CustomerRequest } from '../../middlewares/customer-auth.middleware';
import { CreateOrderDTO } from '../../models/dto/order.dto';
import { ClientOrderService } from 'services/client/order.service';

export class ClientOrderController {
    private service = new ClientOrderService();

    create = async (req: CustomerRequest, res: Response, next: NextFunction) => {
        try {
            const customerId = Number(req.customer!.customerId);
            const order = await this.service.createOrder(customerId, req.body as CreateOrderDTO);
            return responseUtil.success(res, order, 'Đặt hàng thành công', 201);
        } catch (error) {
            next(error);
        }
    };

    getMyOrders = async (req: CustomerRequest, res: Response, next: NextFunction) => {
        try {
            const customerId = Number(req.customer!.customerId);
            const { page, limit } = getPaginationParams(
                req.query.page as string | number | undefined,
                req.query.limit as string | number | undefined
            );
            const { status } = req.query;
            const result = await this.service.getMyOrders(customerId, page, limit, status as string);
            return responseUtil.paginate(res, result.data, page, limit, result.total, 'Lấy lịch sử đơn hàng thành công');
        } catch (error) {
            next(error);
        }
    };

    getMyOrderById = async (req: CustomerRequest, res: Response, next: NextFunction) => {
        try {
            const customerId = Number(req.customer!.customerId);
            const order = await this.service.getMyOrderById(customerId, req.params.id);
            return responseUtil.success(res, order, 'Lấy chi tiết đơn hàng thành công');
        } catch (error) {
            next(error);
        }
    };

    cancel = async (req: CustomerRequest, res: Response, next: NextFunction) => {
        try {
            const customerId = Number(req.customer!.customerId);
            const order = await this.service.cancelOrder(customerId, req.params.id);
            return responseUtil.success(res, order, 'Hủy đơn hàng thành công');
        } catch (error) {
            next(error);
        }
    };

    getSummary = async (req: CustomerRequest, res: Response, next: NextFunction) => {
        try {
            const customerId = Number(req.customer!.customerId);
            if (!customerId || isNaN(customerId)) {
                throw new Error('Invalid customer ID');
            }
            const summary = await this.service.getOrderSummaryByStatus(customerId);
            return responseUtil.success(res, summary, 'Lấy summary đơn hàng thành công');
        } catch (error: any) {
            next(error);
        }
    };
}

