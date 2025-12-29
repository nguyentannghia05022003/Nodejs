import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { DashboardOrderService } from '../../services/admin/dashboard.order.service';

export class DashboardOrderController {
  private service = new DashboardOrderService();

  getRevenueByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const days = req.query.days ? Number(req.query.days) : 7;
      const data = await this.service.getRevenueByDate(days);
      return responseUtil.success(res, data, 'Lấy doanh số đơn theo ngày thành công');
    } catch (error) {
      next(error);
    }
  };

  getRevenueByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getRevenueByStatus();
      return responseUtil.success(res, data, 'Lấy doanh số đơn theo trạng thái thành công');
    } catch (error) {
      next(error);
    }
  };

  getTodayComparison = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getTodayComparison();
      return responseUtil.success(res, data, 'Lấy so sánh doanh số đơn thành công');
    } catch (error) {
      next(error);
    }
  };
}

