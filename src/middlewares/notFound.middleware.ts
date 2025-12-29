import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../utils/error';

export const notFoundMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    throw new NotFoundError(`Route ${req.method} ${req.originalUrl} không tồn tại`);
};

