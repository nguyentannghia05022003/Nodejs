import { Customer } from '../../entities/Customer.entity';
import hashUtil from '../../utils/hash';
import jwtService from '../common/jwt.service';
import { UnauthorizedError, BadRequestError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { addHours, nowUnix, toUnix } from 'src/utils/time';

export class ClientAuthService {
  private customerRepo = AppDataSource.getRepository(Customer);

  async register(data: { email: string; password: string; fullName: string; phone?: string }) {
    const existingCustomer = await this.customerRepo.findOne({
      where: { email: data.email }
    });

    if (existingCustomer) {
      throw new BadRequestError('Email đã được sử dụng');
    }

    const hashedPassword = await hashUtil.hash(data.password);

    const customer = this.customerRepo.create({
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
      phone: data.phone,
      isDeleted: false,
    });

    await this.customerRepo.save(customer);

    const { password, ...customerData } = customer;
    return customerData;
  }

  async login(username: string, password: string) {
    const customer = await this.customerRepo.findOne({ where: { email: username, isDeleted: false } });

    if (!customer) {
      throw new UnauthorizedError('Username hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await hashUtil.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Username hoặc mật khẩu không đúng');
    }

    const payload = {
      sub: "token login",
      iss: "from server",
      id: customer.id,
      role: 'customer',
      fullName: customer.fullName,
      phone: customer.phone
    };

    const accessToken = jwtService.generateToken(payload);

    const decoded = jwtService.decodeToken(accessToken);
    const exp = decoded?.exp;
    const tokenExpires = exp ?? addHours(nowUnix(), 24);

    const createdAt = toUnix(customer.createdAt);
    const updatedAt = toUnix(customer.updatedAt);

    const { password: _, ...customerData } = customer;

    return {
      accessToken,
      customer: {
        ...customerData,
        createdAt,
        updatedAt,
      },
      tokenExpires,
    };
  }

  async logout(customerId: string) {
    return { message: 'Đăng xuất thành công' };
  }
}