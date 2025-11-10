import { Request, Response } from "express";
import { UserService } from "services/user.service";

const userService = new UserService();

export class UserController {
    static async getAll(req: Request, res: Response) {
        const users = await userService.findAll();
        return res.json(users);
    }

    static async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = await userService.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
    }

    static async create(req: Request, res: Response) {
        const newUser = await userService.create(req.body);
        return res.status(201).json(newUser);
    }

    static async update(req: Request, res: Response) {
        try {
            // Không cho phép update password qua endpoint này
            if (req.body.password) {
                return res.status(400).json({
                    message: "Cannot update password through this endpoint."
                });
            }
            const id = parseInt(req.params.id);
            const updated = await userService.update(id, req.body);
            return res.json(updated);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await userService.delete(id);
            return res.json({ message: "User deleted" });
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }
    }
}
