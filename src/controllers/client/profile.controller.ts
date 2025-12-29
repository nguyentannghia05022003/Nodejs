import { Response, NextFunction } from 'express';
import { ClientProfileService } from '../../services/client/profile.service';
import responseUtil from '../../utils/response';
import { CustomerRequest } from '../../middlewares/customer-auth.middleware';

export class ClientProfileController {
  private service = new ClientProfileService();

  getProfile = async (req: CustomerRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await this.service.getProfile(req.customer!.customerId);
      return responseUtil.success(res, profile);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: CustomerRequest, res: Response, next: NextFunction) => {
    try {
      const { fullName, phone, avatar } = req.body;
      const profile = await this.service.updateProfile(req.customer!.customerId, { fullName, phone, avatar });
      return responseUtil.success(res, profile, 'Cập nhật thông tin thành công');
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: CustomerRequest, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;
      await this.service.changePassword(
        req.customer!.customerId,
        oldPassword,
        newPassword
      );
      return responseUtil.success(res, null, 'Đổi mật khẩu thành công');
    } catch (error) {
      next(error);
    }
  };
}