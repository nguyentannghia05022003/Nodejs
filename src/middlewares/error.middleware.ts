import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';
import { QueryFailedError } from 'typeorm';
import { logger } from '../utils/logger';

export const errorMiddleware = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(err);
    }

    const errorInfo = {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        error: {
            name: err.name,
            message: err.message,
            stack: err.stack,
        }
    };

    if (err instanceof AppError) {
        logger.warn('Application Error:', errorInfo);
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message
        });
    }

    if (err.name === 'ValidationError') {
        logger.warn('Validation Error:', errorInfo);
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Dữ liệu không hợp lệ',
            error: err.message
        });
    }

    if (err instanceof QueryFailedError) {
        logger.error('Database Query Error:', errorInfo);
        const isDev = process.env.NODE_ENV === 'development';
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Lỗi cơ sở dữ liệu',
            ...(isDev && { error: err.message })
        });
    }

    if (err.name?.includes('TypeORM')) {
        logger.error('TypeORM Error:', errorInfo);
        const isDev = process.env.NODE_ENV === 'development';

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Lỗi cơ sở dữ liệu',
            ...(isDev && { error: err.message })
        });
    }

    logger.error('Unhandled Error:', errorInfo);
    const isDev = process.env.NODE_ENV === 'development';
    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Lỗi máy chủ',
        ...(isDev && { error: err.message })
    });
};