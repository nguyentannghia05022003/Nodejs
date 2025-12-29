import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { CustomerRequest } from '../../middlewares/customer-auth.middleware';
import { ClientAuthService } from 'services/client/auth.service';
import { ClientRegisterDTO, ClientLoginDTO } from '../../models/dto/auth.dto';

export class ClientAuthController {
    private service = new ClientAuthService();

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as ClientRegisterDTO;
            const customer = await this.service.register({
                email: dto.email,
                password: dto.password,
                fullName: dto.fullName,
                phone: dto.phone,
            });
            return responseUtil.success(res, customer, 'Đăng ký thành công', 201);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = req.body as ClientLoginDTO;
            const result = await this.service.login(dto.username, dto.password);
            return responseUtil.success(res, result, 'Đăng nhập thành công');
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: CustomerRequest, res: Response, next: NextFunction) => {
        try {
            await this.service.logout(req.customer!.customerId);
            return responseUtil.success(res, null, 'Đăng xuất thành công');
        } catch (error) {
            next(error);
        }
    };
}
