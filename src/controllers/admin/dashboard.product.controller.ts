import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { DashboardProductService } from '../../services/admin/dashboard.product.service';

export class DashboardProductController {
    private service = new DashboardProductService();

    getProductsDashboard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryId = req.query.categoryId 
                ? Number(req.query.categoryId) 
                : undefined;
            const dashboard = await this.service.getProductsDashboard(categoryId);
            return responseUtil.success(res, dashboard, 'Lấy dashboard sản phẩm thành công');
        } catch (error) {
            next(error);
        }
    };
}