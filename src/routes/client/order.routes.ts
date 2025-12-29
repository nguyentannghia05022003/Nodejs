import { Router } from 'express';
import { ClientOrderController } from '../../controllers/client/order.controller';
import { customerAuthMiddleware } from '../../middlewares/customer-auth.middleware';
import { validateDto } from '../../middlewares/validation.middleware';
import { CreateOrderDTO } from '../../models/dto/order.dto';

const router = Router();
const controller = new ClientOrderController();

router.post('/', customerAuthMiddleware, validateDto(CreateOrderDTO), controller.create);
router.get('/summary', customerAuthMiddleware, controller.getSummary);
router.get('/', customerAuthMiddleware, controller.getMyOrders);
router.put('/:id/cancel', customerAuthMiddleware, controller.cancel);
router.get('/:id', customerAuthMiddleware, controller.getMyOrderById);

export default router;

