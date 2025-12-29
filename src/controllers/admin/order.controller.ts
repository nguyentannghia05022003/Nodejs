import { Request, Response, NextFunction } from 'express';
import { AdminOrderService } from '../../services/admin/order.service';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';
import { OrderStatus } from 'entities/Order.entity';
import { BadRequestError } from '../../utils/error';
import { AdminCreateOrderDTO } from '../../models/dto/order.dto';

export class AdminOrderController {
    private service = new AdminOrderService();

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, limit } = getPaginationParams(req.query.page as any, req.query.limit as any);
            const { status, search } = req.query;
            const result = await this.service.getAll(page, limit, status as string, search as string);
            return responseUtil.paginate(res, result.data, page, limit, result.total, 'Lấy danh sách đơn hàng thành công');
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await this.service.getById(req.params.id);
            return responseUtil.success(res, order, 'Lấy chi tiết đơn hàng thành công');
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as AdminCreateOrderDTO;
            const order = await this.service.createOrder(data);
            return responseUtil.success(res, order, 'Tạo đơn hàng thành công', 201);
        } catch (error) {
            next(error);
        }
    };

    updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { status } = req.body;
            if (!Object.values(OrderStatus).includes(status)) {
                throw new BadRequestError('Trạng thái không hợp lệ');
            }
            const order = await this.service.updateStatus(req.params.id, status);
            return responseUtil.success(res, order, `Cập nhật trạng thái thành công: ${status}`);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.params.id);
            return responseUtil.success(res, null, 'Xóa đơn hàng thành công');
        } catch (error) {
            next(error);
        }
    };
}
