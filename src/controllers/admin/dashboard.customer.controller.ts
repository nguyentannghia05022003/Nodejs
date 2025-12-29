import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { DashboardCustomerService } from 'services/admin/dashboard.customer.service';

export class DashboardCustomerController {
  private service = new DashboardCustomerService();

  // getCustomerDashboard = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const limit = req.query.limit ? Number(req.query.limit) : 10;
  //     const dashboard = await this.service.getCustomerDashboard(limit);
  //     return responseUtil.success(res, dashboard, 'Lấy dashboard khách hàng thành công');
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  getTopCustomersByOrderCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const customers = await this.service.getTopCustomersByOrderCount(limit);
      return responseUtil.success(res, customers, 'Lấy top khách hàng theo số đơn thành công');
    } catch (error) {
      next(error);
    }
  };

  getTopCustomersByRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const customers = await this.service.getTopCustomersByRevenue(limit);
      return responseUtil.success(res, customers, 'Lấy top khách hàng theo doanh số thành công');
    } catch (error) {
      next(error);
    }
  };

  getPurchaseCycles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customerId = req.query.customerId ? Number(req.query.customerId) : undefined;
      const cycles = await this.service.getCustomerPurchaseCycle(customerId);
      return responseUtil.success(res, cycles, 'Lấy chu kỳ mua hàng thành công');
    } catch (error) {
      next(error);
    }
  };
}

