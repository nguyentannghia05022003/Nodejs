import { Response, NextFunction } from 'express';
import { AdminProfileService } from '../../services/admin/profile.service';
import responseUtil from '../../utils/response';
import { AdminRequest } from '../../middlewares/admin-auth.middleware';

export class AdminProfileController {
  private service = new AdminProfileService();

  getProfile = async (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await this.service.getProfile(req.admin!.adminId);
      return responseUtil.success(res, profile);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      const { fullName, phone, avatar } = req.body;
      const profile = await this.service.updateProfile(req.admin!.adminId, { fullName, phone, avatar });
      return responseUtil.success(res, profile, 'Cập nhật thông tin thành công');
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;
      await this.service.changePassword(req.admin!.adminId, oldPassword, newPassword);
      return responseUtil.success(res, null, 'Đổi mật khẩu thành công');
    } catch (error) {
      next(error);
    }
  };
}