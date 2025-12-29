import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: T;
    error?: any;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

const responseUtil = {
    success<T>(
        res: Response,
        data?: T,
        message = 'Success',
        statusCode = 200
    ): Response {
        const response: ApiResponse<T> = {
            success: true,
            statusCode,
            message,
            data,
        };
        return res.status(statusCode).json(response);
    },

    error(
        res: Response,
        message = 'Error',
        statusCode = 500,
        error?: any
    ): Response {
        const response: ApiResponse = {
            success: false,
            statusCode,
            message,
            error,
        };
        return res.status(statusCode).json(response);
    },

    paginate<T>(
        res: Response,
        data: T[],
        page: number,
        limit: number,
        total: number,
        message = 'Success'
    ): Response {
        const response: ApiResponse<T[]> = {
            success: true,
            statusCode: 200,
            message,
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
        return res.status(200).json(response);
    }
};

export default responseUtil;