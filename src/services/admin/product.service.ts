// src/services/admin/product.service.ts
import { NotFoundError, BadRequestError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { Product } from 'entities/Product.entity';
import { Category } from 'entities/Category.entity';
import { getSkip } from '../../utils/pagination';
import { CreateProductDTO } from 'src/models/dto/product.dto';

export class ProductService {
    private productRepo = AppDataSource.getRepository(Product);
    private categoryRepo = AppDataSource.getRepository(Category);

    async getAllProducts(page: number, limit: number) {
        const skip = getSkip(page, limit);

        const [data, total] = await this.productRepo.findAndCount({
            where: { isDeleted: false },
            relations: ['category'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return { data, total };
    }

    async getProductById(id: string) {
        const idNum = Number(id);

        const product = await this.productRepo.findOne({
            where: { id: idNum, isDeleted: false },
            relations: ['category'],
        });

        if (!product) throw new NotFoundError('Không tìm thấy sản phẩm');

        return product;
    }

    async createProduct(data: CreateProductDTO) {
        const exists = await this.productRepo.findOne({
            where: { name: data.name },
        });
        if (exists) throw new BadRequestError('Sản phẩm đã tồn tại');

        const category = await this.categoryRepo.findOne({
            where: { id: data.categoryId, isDeleted: false }, // object
        });
        if (!category) throw new NotFoundError('Danh mục không tồn tại');

        const product = this.productRepo.create({
            name: data.name,
            image: data.image,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            category,
            isDeleted: false,
        });

        return await this.productRepo.save(product);
    }

    async updateProduct(id: string, data: Partial<CreateProductDTO>) {
        const idNum = Number(id);

        const product = await this.productRepo.findOne({
            where: { id: idNum, isDeleted: false }, // object
        });
        if (!product) throw new NotFoundError('Không tìm thấy sản phẩm');

        if (data.name && data.name !== product.name) {
            const exists = await this.productRepo.findOne({
                where: { name: data.name, isDeleted: false },
            });
            if (exists && exists.id !== idNum) {
                throw new BadRequestError('Tên sản phẩm đã tồn tại');
            }
        }

        if (data.name) product.name = data.name;
        if (data.image) product.image = data.image;
        if (data.description) product.description = data.description;
        if (data.price !== undefined) product.price = data.price;

        if (data.categoryId !== undefined) {
            const category = await this.categoryRepo.findOne({
                where: { id: data.categoryId, isDeleted: false },
            });
            if (!category) throw new NotFoundError('Danh mục không tồn tại');

            product.categoryId = data.categoryId;
            product.category = category;
        }

        return await this.productRepo.save(product);
    }

    async deleteProduct(id: string) {
        const idNum = Number(id);

        const product = await this.productRepo.findOne({
            where: { id: idNum, isDeleted: false },
        });
        if (!product) throw new NotFoundError('Không tìm thấy sản phẩm');

        product.isDeleted = true;
        await this.productRepo.save(product);
    }
}