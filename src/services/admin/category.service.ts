import { AppDataSource } from 'config/db';
import { Category } from '../../entities/Category.entity';
import { Product } from '../../entities/Product.entity';
import { BadRequestError, NotFoundError } from '../../utils/error';
import { getSkip } from '../../utils/pagination';
import { Not } from 'typeorm';

export class CategoryService {
    private categoryRepo = AppDataSource.getRepository(Category);
    private productRepo = AppDataSource.getRepository(Product);

    async getAll(page: number, limit: number) {
        const skip = getSkip(page, limit);
        const [data, total] = await this.categoryRepo.findAndCount({
            where: { isDeleted: false },
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return { data, total };
    }

    async getById(id: string) {
        const idNum = Number(id);
        const category = await this.categoryRepo.findOne({
            where: {
                id: idNum,
                isDeleted: false,
                // products: { isDeleted: false }
            },
            // relations: ['products'],
            // order: {
            //     products: { createdAt: 'DESC' }
            // }
        });
        if (!category) throw new NotFoundError('Không tìm thấy danh mục');
        return category;
    }

    async create(data: { categoryCode: string; name: string }) {
        if (!data.categoryCode || !data.name) {
            throw new BadRequestError('Mã danh mục và tên danh mục không được để trống');
        }

        const exists = await this.categoryRepo.findOne({
            where: { categoryCode: data.categoryCode },
        });
        if (exists) throw new BadRequestError('Mã danh mục đã tồn tại');

        const category = this.categoryRepo.create({
            categoryCode: data.categoryCode.trim(),
            name: data.name.trim(),
            isDeleted: false
        });

        return await this.categoryRepo.save(category);
    }

    async update(id: string, data: { categoryCode?: string; name?: string }) {
        const idNum = Number(id);
        const category = await this.categoryRepo.findOne({
            where: { id: idNum, isDeleted: false }
        });
        if (!category) throw new NotFoundError('Không tìm thấy danh mục');

        if (data.categoryCode !== undefined) {
            const exists = await this.categoryRepo.findOne({
                where: { categoryCode: data.categoryCode, id: Not(idNum) }
            });
            if (exists) throw new BadRequestError('Mã danh mục đã tồn tại');
            category.categoryCode = data.categoryCode;
        }
        if (data.name !== undefined) category.name = data.name;

        return await this.categoryRepo.save(category);
    }

    async delete(id: string) {
        const idNum = Number(id);
        const category = await this.categoryRepo.findOne({
            where: { id: idNum, isDeleted: false },
            relations: ['products']
        });
        if (!category) throw new NotFoundError('Không tìm thấy danh mục');

        category.isDeleted = true;
        await this.categoryRepo.save(category);
    }
}