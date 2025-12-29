import hashUtil from '../../utils/hash';
import { NotFoundError, BadRequestError } from '../../utils/error';
import { getSkip } from '../../utils/pagination';
import { Like } from 'typeorm';
import { AppDataSource } from 'config/db';
import { Admin } from 'entities/Admin.entity';
import { toUnix } from 'src/utils/time';

export class AdminService {
    private adminRepo = AppDataSource.getRepository(Admin);

    private formatAdmin(admin: Admin) {
        const { password, ...rest } = admin;
        return {
            ...rest,
            createdAtUnix: toUnix(admin.createdAt),
            updatedAtUnix: toUnix(admin.updatedAt),
        };
    }

    async getAllAdmins(page: number, limit: number, searchName?: string, searchEmail?: string) {
        const skip = getSkip(page, limit);
        const where: any = { isDeleted: false };

        if (searchName) {
            where.fullName = Like(`%${searchName}%`);
        }
        if (searchEmail) {
            where.email = Like(`%${searchEmail}%`);
        }

        const [data, total] = await this.adminRepo.findAndCount({
            where,
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const admins = data.map(admin => this.formatAdmin(admin));
        return { data: admins, total };
    }

    async getAdminById(id: string) {
        const idNum = Number(id);
        const admin = await this.adminRepo.findOne({ where: { id: idNum, isDeleted: false } });
        if (!admin) throw new NotFoundError('Không tìm thấy admin');

        const { password, ...adminData } = admin;
        return adminData;
    }

    async createAdmin(data: { email: string; password: string; fullName: string; phone: string }) {
        const exist = await this.adminRepo.findOne({
            where: { email: data.email, isDeleted: false }// thiếu isdlete :false

        });

        if (exist) {
            throw new BadRequestError('Email đã được sử dụng');
        }

        const hashedPassword = await hashUtil.hash(data.password);

        const admin = this.adminRepo.create({
            email: data.email,
            password: hashedPassword,
            fullName: data.fullName,
            phone: data.phone,
            avatar: "abcd.jpg",
            //
        });

        const adminData = await this.adminRepo.save(admin);
        return this.formatAdmin(adminData);
    }

    async updateAdmin(id: string, data: { fullName?: string; phone?: string }) {
        const idNum = Number(id);
        const admin = await this.adminRepo.findOne({ where: { id: idNum, isDeleted: false } });
        if (!admin) throw new NotFoundError('Không tìm thấy admin');

        if (data.fullName !== undefined) admin.fullName = data.fullName;
        if (data.phone !== undefined) admin.phone = data.phone;

        const adminData = await this.adminRepo.save(admin);

        return this.formatAdmin(adminData);
    }

    async deleteAdmin(id: string) {
        const idNum = Number(id);
        const admin = await this.adminRepo.findOne({ where: { id: idNum, isDeleted: false } });
        if (!admin) throw new NotFoundError('Không tìm thấy admin');

        if (admin.isDefault) {
            throw new BadRequestError('Không thể xóa tài khoản admin mặc định');
        }

        admin.isDeleted = true;
        await this.adminRepo.save(admin);
    }

    async resetPassword(id: string, newPassword: string) {
        const idNum = Number(id);
        const admin = await this.adminRepo.findOne({ where: { id: idNum } });
        if (!admin) throw new NotFoundError('Không tìm thấy admin');

        admin.password = await hashUtil.hash(newPassword);
        await this.adminRepo.save(admin);
    }
}