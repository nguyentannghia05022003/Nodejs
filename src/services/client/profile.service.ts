import hashUtil from '../../utils/hash';
import { NotFoundError, BadRequestError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { Customer } from 'entities/Customer.entity';

export class ClientProfileService {
    private customerRepo = AppDataSource.getRepository(Customer);

    async getProfile(id: string) {
        const idNum = Number(id);
        const customer = await this.customerRepo.findOne({ where: { id: idNum } });
        if (!customer) throw new NotFoundError('Không tìm thấy tài khoản');

        const { password, ...profile } = customer;
        return profile;
    }

    async updateProfile(id: string, data: { fullName?: string; phone?: string; avatar?: string }) {
        const idNum = Number(id);
        const customer = await this.customerRepo.findOne({ where: { id: idNum } });
        if (!customer) throw new NotFoundError('Không tìm thấy tài khoản');

        if (data.fullName) customer.fullName = data.fullName;
        if (data.phone) customer.phone = data.phone;
        if (data.avatar) customer.avatar = data.avatar;

        await this.customerRepo.save(customer);

        const { password, ...profile } = customer;
        return profile;
    }

    async changePassword(id: string, oldPassword: string, newPassword: string) {
        const idNum = Number(id);
        const customer = await this.customerRepo.findOne({ where: { id: idNum } });
        if (!customer) throw new NotFoundError('Không tìm thấy tài khoản');

        const isPasswordValid = await hashUtil.compare(oldPassword, customer.password);
        if (!isPasswordValid) {
            throw new BadRequestError('Mật khẩu cũ không đúng');
        }

        customer.password = await hashUtil.hash(newPassword);
        await this.customerRepo.save(customer);
    }
}   