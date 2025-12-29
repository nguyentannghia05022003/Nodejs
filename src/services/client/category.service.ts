import { AppDataSource } from 'config/db';
import { Category } from '../../entities/Category.entity';
import { getSkip } from '../../utils/pagination';
import { NotFoundError } from '../../utils/error';

export class ClientCategoryService {
    private categoryRepo = AppDataSource.getRepository(Category);

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
            where: { id: idNum, isDeleted: false },
            relations: ['products']
        });
        if (!category) throw new NotFoundError('Không tìm thấy danh mục');
        return category;
    }
}

