import hashUtil from '../../utils/hash';
import jwtService from '../common/jwt.service';
import { UnauthorizedError } from '../../utils/error';
import { AppDataSource } from 'config/db';
import { Admin } from 'entities/Admin.entity';
import { addHours, nowUnix, toUnix } from 'src/utils/time';

export class AdminAuthService {
    private adminRepo = AppDataSource.getRepository(Admin);

    async login(username: string, password: string) {
        const admin = await this.adminRepo.findOne({
            where: { email: username, isDeleted: false }
        });

        if (!admin) {
            throw new UnauthorizedError('Username hoặc mật khẩu không đúng');
        }

        const isPasswordValid = await hashUtil.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Username hoặc mật khẩu không đúng');
        }

        const payload = {
            sub: "token login",
            iss: "from server",
            id: admin.id,
            role: 'admin',
            fullName: admin.fullName,
            phone: admin.phone
        };

        const accessToken = jwtService.generateToken(payload);

        const decoded = jwtService.decodeToken(accessToken);
        const exp = decoded?.exp;
        const tokenExpires = exp ?? addHours(nowUnix(), 24);

        const { password: _, ...adminData } = admin;

        return {
            accessToken,
            admin: {
                ...adminData
            },
            tokenExpires,
        };
    }

    async logout(adminId: string) {
        return { message: 'Đăng xuất thành công' };
    }
}