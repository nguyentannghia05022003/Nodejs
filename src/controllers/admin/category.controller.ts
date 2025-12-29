import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';
import { CategoryService } from '../../services/admin/category.service';
import { QueryFailedError } from 'typeorm';

export class CategoryController {
  private service = new CategoryService();

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
      return responseUtil.success(res, category);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryCode, name } = req.body;
      const category = await this.service.create({ categoryCode, name });
      return responseUtil.success(res, category, 'Tạo danh mục thành công', 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryCode, name } = req.body;
      const category = await this.service.update(req.params.id, { categoryCode, name });
      return responseUtil.success(res, category, 'Cập nhật danh mục thành công');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return responseUtil.success(res, null, 'Xóa danh mục thành công');
    } catch (error) {
      next(error);
    }
  };
}

