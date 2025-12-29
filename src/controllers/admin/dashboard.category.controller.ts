import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { DashboardCategoryService } from '../../services/admin/dashboard.cetegory.service';

export class DashboardCategoryController {
  private service = new DashboardCategoryService();

  getCategoryDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dashboard = await this.service.getCategoryDashboard();
      return responseUtil.success(res, dashboard, 'Lấy dashboard danh mục thành công');
    } catch (error) {
      next(error);
    }
  };
}

