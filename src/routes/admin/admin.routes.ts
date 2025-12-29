import { Router } from 'express';
import { AdminController } from '../../controllers/admin/admin.controller';
import { validateDto } from '../../middlewares/validation.middleware';
import { CreateAdminDTO, ResetPasswordDTO } from '../../models/dto/user.dto';

const router = Router();
const controller = new AdminController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateDto(CreateAdminDTO), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/reset-password', validateDto(ResetPasswordDTO), controller.resetPassword);

export default router;