import { Request, Response, NextFunction } from 'express';
import { AdminAuthService } from '../../services/admin/auth.service';
import responseUtil from '../../utils/response';
import { AdminRequest } from '../../middlewares/admin-auth.middleware';
import { AdminLoginDTO } from '../../models/dto/auth.dto';

export class AdminAuthController {
  private service = new AdminAuthService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as AdminLoginDTO;
      const result = await this.service.login(dto.username, dto.password);
      return responseUtil.success(res, result, 'Đăng nhập thành công');
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      await this.service.logout(req.admin!.adminId);
      return responseUtil.success(res, null, 'Đăng xuất thành công');
    } catch (error) {
      next(error);
    }
  };
}
