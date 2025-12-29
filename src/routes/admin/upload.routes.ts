import { Router } from 'express';
import { upload } from 'config/multer.config';
import { UploadController } from 'controllers/admin/upload.controller';

const router = Router();
const controller = new UploadController();

router.post('/avatar', upload.single('avatar'), controller.uploadAvatar);
router.post('/product', upload.single('product'), controller.uploadProduct);

export default router;

