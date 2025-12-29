import { Request, Response, NextFunction } from 'express';
import responseUtil from '../../utils/response';
import { getPaginationParams } from '../../utils/pagination';
import { ProductService } from 'services/admin/product.service';
import { BadRequestError } from '../../utils/error';

export class ProductController {
    private service = new ProductService();

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, limit } = getPaginationParams(
                req.query.page as string | number | undefined,
                req.query.limit as string | number | undefined
            );
            const result = await this.service.getAllProducts(page, limit);
            return responseUtil.paginate(res, result.data, page, limit, result.total, 'Lấy danh sách sản phẩm thành công');
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await this.service.getProductById(req.params.id);
            return responseUtil.success(res, customer);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, image, description, price, categoryId } = req.body;
            const product = await this.service.createProduct({ name, image, description, price, categoryId });
            return responseUtil.success(res, product, 'Tạo sản phẩm thành công', 201);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, image, description, price, categoryId } = req.body;
            const product = await this.service.updateProduct(req.params.id, { name, image, description, price, categoryId });
            return responseUtil.success(res, product, 'Cập nhật sản phẩm thành công');
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.service.deleteProduct(req.params.id);
            return responseUtil.success(res, null, 'Xóa sản phẩm thành công');
        } catch (error) {
            next(error);
        }
    };
}