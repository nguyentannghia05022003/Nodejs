import { AppDataSource } from "config/db";
import { Admin } from "entities/Admin";


export class UserService {
    private userRepo = AppDataSource.getRepository(Admin);

    async findAll() {
        return this.userRepo.find();
    }

    async findById(id: number) {
        return this.userRepo.findOneBy({ id });
    }

    async create(data: Partial<Admin>) {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    async update(id: number, data: Partial<Admin>) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) throw new Error("User not found");
        // Loại bỏ password khỏi data - không cho phép update password qua endpoint này
        const { password, ...updateData } = data;
        Object.assign(user, updateData);
        return this.userRepo.save(user);
    }

    async delete(id: number) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) throw new Error("User not found");
        await this.userRepo.remove(user);
        return true;
    }
}
