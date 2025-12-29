import { Router } from 'express';
import { ClientProfileController } from '../../controllers/client/profile.controller';
import { validateDto } from '../../middlewares/validation.middleware';
import { customerAuthMiddleware } from '../../middlewares/customer-auth.middleware';
import { ChangePasswordDTO } from '../../models/dto/user.dto';

const router = Router();
const controller = new ClientProfileController();

router.get('/', customerAuthMiddleware, controller.getProfile);
router.put('/', customerAuthMiddleware, controller.updateProfile);
router.post('/change-password', customerAuthMiddleware, validateDto(ChangePasswordDTO), controller.changePassword);

export default router;