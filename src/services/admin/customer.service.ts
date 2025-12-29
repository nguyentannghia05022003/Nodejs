import { AppDataSource } from 'config/db';
import { Customer } from '../../entities/Customer.entity';
import { NotFoundError, BadRequestError } from '../../utils/error';
import { getSkip } from '../../utils/pagination';
import { Like } from 'typeorm';
import hashUtil from '../../utils/hash';

export class CustomerService {
  private customerRepo = AppDataSource.getRepository(Customer);

  async getAllCustomers(page: number, limit: number, search?: string) {
    const skip = getSkip(page, limit);
    const where: any = { isDeleted: false };

    if (search) {
      where.fullName = Like(`%${search}%`);
    }

    const [data, total] = await this.customerRepo.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const customers = data.map(({ password, ...customer }) => customer);
    return { data: customers, total };
  }

  async getCustomerById(id: string) {
    const idNum = Number(id);
    const customer = await this.customerRepo.findOne({
      where: { id: idNum, isDeleted: false },
      relations: ['orders'],
    });

    if (!customer) throw new NotFoundError('Không tìm thấy khách hàng');

    const { password, ...customerData } = customer;
    return customerData;
  }

  async createCustomer(data: { email: string; password: string; fullName: string; phone?: string }) {
    const exists = await this.customerRepo.findOne({
      where: { email: data.email },
    });

    if (exists) {
      throw new BadRequestError('Email đã được sử dụng');
    }

    const customer = this.customerRepo.create({
      email: data.email,
      password: await hashUtil.hash(data.password),
      fullName: data.fullName,
      phone: data.phone,
      isDeleted: false,
    });

    await this.customerRepo.save(customer);

    const { password, ...customerData } = customer;
    return customerData;
  }

  async updateCustomer(id: string, data: { fullName?: string; phone?: string }) {
    const idNum = Number(id);
    const customer = await this.customerRepo.findOne({ where: { id: idNum, isDeleted: false } });
    if (!customer) throw new NotFoundError('Không tìm thấy khách hàng');

    if (data.fullName !== undefined) customer.fullName = data.fullName;
    if (data.phone !== undefined) customer.phone = data.phone;
    await this.customerRepo.save(customer);

    const { password, ...customerData } = customer;
    return customerData;
  }

  async deleteCustomer(id: string) {
    const idNum = Number(id);
    const customer = await this.customerRepo.findOne({ where: { id: idNum, isDeleted: false } });
    if (!customer) throw new NotFoundError('Không tìm thấy khách hàng');

    customer.isDeleted = true;
    await this.customerRepo.save(customer);
  }
}