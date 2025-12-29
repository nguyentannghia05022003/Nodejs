import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';
import { ClientCategoryService } from '../../services/client/category.service';

export class ClientCategoryController {
  private service = new ClientCategoryService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = getPaginationParams(
        req.query.page as string | number | undefined,
        req.query.limit as string | number | undefined
      );
      const result = await this.service.getAll(page, limit);
      return responseUtil.paginate(res, result.data, page, limit, result.total, 'Lấy danh sách danh mục thành công');
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.getById(req.params.id);
      return responseUtil.success(res, category, 'Lấy chi tiết danh mục thành công');
    } catch (error) {
      next(error);
    }
  };
}

