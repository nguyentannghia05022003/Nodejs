export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginationResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const getPaginationParams = (
    page?: string | number,
    limit?: string | number
): PaginationParams => {
    const pageNum = page ? parseInt(page.toString(), 10) : 1;
    const limitNum = limit ? parseInt(limit.toString(), 10) : 10;

    return {
        page: pageNum > 0 ? pageNum : 1,
        limit: limitNum > 0 && limitNum <= 100 ? limitNum : 10,
    };
};

export const getSkip = (page: number, limit: number): number => {
    return (page - 1) * limit;
};