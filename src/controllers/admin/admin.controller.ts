import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../../services/admin/admin.service';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';

export class AdminController {
  private service = new AdminService();


  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = getPaginationParams(
        req.query.page as string | number | undefined,
        req.query.limit as string | number | undefined
      );
      const { fullName, email } = req.query;
      const result = await this.service.getAllAdmins(page, limit, fullName as string, email as string);
      return responseUtil.paginate(res, result.data, page, limit, result.total, 'Lấy danh sách admin thành công');
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.service.getAdminById(req.params.id);
      return responseUtil.success(res, admin);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, fullName, phone } = req.body;
      const admin = await this.service.createAdmin({ email, password, fullName, phone });
      return responseUtil.success(res, admin, 'Tạo admin thành công', 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, phone } = req.body;
      const admin = await this.service.updateAdmin(req.params.id, { fullName, phone });
      return responseUtil.success(res, admin, 'Cập nhật admin thành công');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteAdmin(req.params.id);
      return responseUtil.success(res, null, 'Xóa admin thành công');
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { newPassword } = req.body;
      await this.service.resetPassword(req.params.id, newPassword);
      return responseUtil.success(res, null, 'Reset mật khẩu thành công');
    } catch (error) {
      next(error);
    }
  };
}
