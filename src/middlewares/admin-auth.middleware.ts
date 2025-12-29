import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/common/jwt.service';
import { UnauthorizedError } from '../utils/error';
import { AppDataSource } from 'config/db';
import { Admin } from 'entities/Admin.entity';

export interface AdminRequest extends Request {
  admin?: { adminId: string; email: string };
}

export const adminAuthMiddleware = async (
  req: AdminRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Vui lòng đăng nhập');
    }

    const payload = jwtService.verifyToken(token);

    if (payload.role !== 'admin') {
      throw new UnauthorizedError('Token không hợp lệ cho admin');
    }

    const adminId = Number(payload.id || payload.userId);

    if (!adminId || isNaN(adminId)) {
      throw new UnauthorizedError('Token không hợp lệ');
    }

    const admin = await AppDataSource.getRepository(Admin).findOne({
      where: { id: adminId, isDeleted: false },
    });

    if (!admin) {
      throw new UnauthorizedError('Tài khoản không tồn tại hoặc đã bị xóa');
    }

    req.admin = { adminId: String(adminId), email: admin.email };
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
