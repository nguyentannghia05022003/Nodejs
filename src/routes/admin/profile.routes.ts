import { Router } from 'express';
import { AdminProfileController } from '../../controllers/admin/profile.controller';
import { validateDto } from '../../middlewares/validation.middleware';
import { UpdateProfileDTO, ChangePasswordDTO } from '../../models/dto/user.dto';

const router = Router();
const controller = new AdminProfileController();

router.get('/', controller.getProfile);

router.put('/', validateDto(UpdateProfileDTO), controller.updateProfile);
router.post('/change-password', validateDto(ChangePasswordDTO), controller.changePassword);

export default router;