import hashUtil from '../../utils/hash';
import { NotFoundError, BadRequestError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { Admin } from 'entities/Admin.entity';

export class AdminProfileService {
    private adminRepo = AppDataSource.getRepository(Admin);

    async getProfile(adminId: string) {
        const idNum = Number(adminId);
        const admin = await this.adminRepo.findOne({ where: { id: idNum, isDeleted: false } });
        if (!admin) throw new NotFoundError('Không tìm thấy tài khoản');

        const { password, ...profile } = admin;
        return profile;
    }

    async updateProfile(adminId: string, data: { fullName?: string; phone?: string; avatar?: string }) {
        const idNum = Number(adminId);
        const admin = await this.adminRepo.findOne({ where: { id: idNum, isDeleted: false } });
        if (!admin) throw new NotFoundError('Không tìm thấy tài khoản');

        if (data.fullName) admin.fullName = data.fullName;
        if (data.phone) admin.phone = data.phone;
        if (data.avatar) admin.avatar = data.avatar;

        await this.adminRepo.save(admin);

        const { password, ...profile } = admin;
        return profile;
    }

    async changePassword(adminId: string, oldPassword: string, newPassword: string) {
        const idNum = Number(adminId);
        const admin = await this.adminRepo.findOne({ where: { id: idNum, isDeleted: false } });
        if (!admin) throw new NotFoundError('Không tìm thấy tài khoản');

        const isPasswordValid = await hashUtil.compare(oldPassword, admin.password);
        if (!isPasswordValid) {
            throw new BadRequestError('Mật khẩu cũ không đúng');
        }

        admin.password = await hashUtil.hash(newPassword);
        await this.adminRepo.save(admin);
    }
}