import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../../services/admin/customer.service';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';

export class CustomerController {
  private service = new CustomerService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = getPaginationParams(
        req.query.page as string | number | undefined,
        req.query.limit as string | number | undefined
      );
      const { search } = req.query;

      const result = await this.service.getAllCustomers(page, limit, search as string);

      return responseUtil.paginate(res, result.data, page, limit, result.total, 'Lấy danh sách khách hàng thành công');
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await this.service.getCustomerById(req.params.id);
      return responseUtil.success(res, customer);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, fullName, phone } = req.body;
      const customer = await this.service.createCustomer({ email, password, fullName, phone });
      return responseUtil.success(res, customer, 'Tạo khách hàng thành công', 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, phone } = req.body;
      const customer = await this.service.updateCustomer(req.params.id, { fullName, phone });
      return responseUtil.success(res, customer, 'Cập nhật khách hàng thành công');
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.deleteCustomer(req.params.id);
      return responseUtil.success(res, null, 'Xóa khách hàng thành công');
    } catch (error) {
      next(error);
    }
  };
}