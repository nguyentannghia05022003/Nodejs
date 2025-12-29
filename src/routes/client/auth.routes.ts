import { Router } from 'express';
import { ClientAuthController } from '../../controllers/client/auth.controller';
import { validateDto } from '../../middlewares/validation.middleware';
import { customerAuthMiddleware } from '../../middlewares/customer-auth.middleware';
import { ClientRegisterDTO, ClientLoginDTO } from '../../models/dto/auth.dto';

const router = Router();
const controller = new ClientAuthController();

router.post('/register', validateDto(ClientRegisterDTO), controller.register);
router.post('/login', validateDto(ClientLoginDTO), controller.login);
router.post('/logout', customerAuthMiddleware, controller.logout);

export default router;