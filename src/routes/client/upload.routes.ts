import { Router } from 'express';
import { UploadController } from '../../controllers/client/upload.controller';
import { upload } from '../../config/multer.config';
import { customerAuthMiddleware } from '../../middlewares/customer-auth.middleware';

const router = Router();
const controller = new UploadController();

router.post('/avatar', customerAuthMiddleware, upload.single('avatar'), controller.uploadAvatar);

export default router;

