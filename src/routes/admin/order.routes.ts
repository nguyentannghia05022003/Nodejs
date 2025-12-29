import { Router } from 'express';
import { AdminOrderController } from '../../controllers/admin/order.controller';
import { adminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { validateDto } from '../../middlewares/validation.middleware';
import { AdminCreateOrderDTO } from '../../models/dto/order.dto';

const router = Router();
const controller = new AdminOrderController();

router.get('/', adminAuthMiddleware, controller.getAll);
router.get('/:id', adminAuthMiddleware, controller.getById);
router.post('/', adminAuthMiddleware, validateDto(AdminCreateOrderDTO), controller.create);
router.put('/:id/status', adminAuthMiddleware, controller.updateStatus);
router.delete('/:id', adminAuthMiddleware, controller.delete);

export default router;