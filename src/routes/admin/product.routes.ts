import { Router } from 'express';
import { validateDto } from '../../middlewares/validation.middleware';
import { ProductController } from 'controllers/admin/product.controller';
import { CreateProductDTO } from '../../models/dto/product.dto';

const router = Router();
const controller = new ProductController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateDto(CreateProductDTO), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;