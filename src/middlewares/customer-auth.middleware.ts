import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/common/jwt.service';
import { UnauthorizedError } from '../utils/error';
import { Customer } from '../entities/Customer.entity';
import { AppDataSource } from 'config/db';

export interface CustomerRequest extends Request {
  customer?: { customerId: string; email: string };
}

export const customerAuthMiddleware = async (
  req: CustomerRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Vui lòng đăng nhập');
    }

    const payload = jwtService.verifyToken(token);

    if (payload.role !== 'customer') {
      throw new UnauthorizedError('Token không hợp lệ cho customer');
    }

    const userId = payload.userId || payload.id;

    if (!userId) {
      throw new UnauthorizedError('Token không hợp lệ');
    }

    const customerId = Number(userId);

    if (!customerId || isNaN(customerId)) {
      throw new UnauthorizedError('Token không hợp lệ');
    }

    const customer = await AppDataSource.getRepository(Customer).findOne({
      where: { id: customerId, isDeleted: false },
    });

    if (!customer) {
      throw new UnauthorizedError('Tài khoản không tồn tại hoặc đã bị khóa');
    }

    req.customer = { customerId: String(customerId), email: customer.email };
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') {
      return next(new UnauthorizedError('Token không hợp lệ'));
    }
    if (err.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Token đã hết hạn'));
    }
    next(err);
  }
};
