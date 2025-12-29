import { Router } from 'express';
import { AdminAuthController } from '../../controllers/admin/auth.controller';
import { validateDto } from '../../middlewares/validation.middleware';
import { adminAuthMiddleware } from '../../middlewares/admin-auth.middleware';
import { AdminLoginDTO } from '../../models/dto/auth.dto';

const router = Router();
const controller = new AdminAuthController();

router.post('/login', validateDto(AdminLoginDTO), controller.login);
router.post('/logout', adminAuthMiddleware, controller.logout);

export default router;